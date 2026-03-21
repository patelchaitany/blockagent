// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

/**
 * @title ScopedDelegation
 * @notice On-chain spending limits for an AI agent session key.
 * Inspired by ERC-7715 (MetaMask Delegation Framework).
 *
 * The human (delegator) deploys this contract and sets:
 * - allowedTokens: which ERC-20s the agent may touch
 * - allowedTargets: whitelisted contracts (e.g. Uniswap router)
 * - maxAmountPerTx: per-transaction spending cap
 * - dailyLimit: rolling 24h spend cap
 * - expiryTimestamp: auto-expiration
 *
 * The agent (delegate) calls executeAction() to spend within bounds.
 * The agent's session key has zero value on its own -- all authority
 * is enforced by this contract.
 */

interface IERC20 {
    function transfer(address to, uint256 amount) external returns (bool);
    function transferFrom(address from, address to, uint256 amount) external returns (bool);
    function balanceOf(address account) external view returns (uint256);
    function allowance(address owner, address spender) external view returns (uint256);
}

contract ScopedDelegation {

    struct DelegationScope {
        address delegator;
        address delegate;
        uint256 maxAmountPerTx;
        uint256 dailyLimit;
        uint256 expiryTimestamp;
        bool active;
    }

    struct DailySpend {
        uint256 amount;
        uint256 windowStart;
    }

    DelegationScope public scope;
    mapping(address => bool) public allowedTokens;
    mapping(address => bool) public allowedTargets;
    DailySpend public dailySpend;

    address[] private _tokenList;
    address[] private _targetList;

    event DelegationCreated(
        address indexed delegator,
        address indexed delegate,
        uint256 maxAmountPerTx,
        uint256 dailyLimit,
        uint256 expiryTimestamp
    );

    event ActionExecuted(
        address indexed delegate,
        address indexed token,
        address indexed target,
        uint256 amount
    );

    event DelegationRevoked(address indexed delegator);
    event ScopeUpdated(address indexed delegator);

    error NotDelegator();
    error NotDelegate();
    error DelegationExpired();
    error DelegationInactive();
    error TokenNotAllowed();
    error TargetNotAllowed();
    error ExceedsMaxPerTx();
    error ExceedsDailyLimit();
    error ZeroAddress();

    constructor(
        address delegate,
        uint256 maxAmountPerTx,
        uint256 dailyLimit,
        uint256 expiryTimestamp,
        address[] memory tokens,
        address[] memory targets
    ) {
        if (delegate == address(0)) revert ZeroAddress();

        scope = DelegationScope({
            delegator: msg.sender,
            delegate: delegate,
            maxAmountPerTx: maxAmountPerTx,
            dailyLimit: dailyLimit,
            expiryTimestamp: expiryTimestamp,
            active: true
        });

        for (uint i = 0; i < tokens.length; i++) {
            allowedTokens[tokens[i]] = true;
            _tokenList.push(tokens[i]);
        }
        for (uint i = 0; i < targets.length; i++) {
            allowedTargets[targets[i]] = true;
            _targetList.push(targets[i]);
        }

        dailySpend = DailySpend({ amount: 0, windowStart: block.timestamp });

        emit DelegationCreated(msg.sender, delegate, maxAmountPerTx, dailyLimit, expiryTimestamp);
    }

    /**
     * @notice Execute a delegated action. Called by the AI agent's session key.
     * @param token ERC-20 token to spend (must be in allowedTokens).
     * @param target Contract to send tokens to (must be in allowedTargets).
     * @param amount Amount to transfer (must be <= maxAmountPerTx).
     */
    function executeAction(
        address token,
        address target,
        uint256 amount
    ) external returns (bool) {
        if (msg.sender != scope.delegate) revert NotDelegate();
        if (!scope.active) revert DelegationInactive();
        if (block.timestamp > scope.expiryTimestamp) revert DelegationExpired();

        if (!allowedTokens[token]) revert TokenNotAllowed();
        if (!allowedTargets[target]) revert TargetNotAllowed();
        if (amount > scope.maxAmountPerTx) revert ExceedsMaxPerTx();

        _refreshDailyWindow();
        if (dailySpend.amount + amount > scope.dailyLimit) revert ExceedsDailyLimit();

        dailySpend.amount += amount;
        bool success = IERC20(token).transferFrom(scope.delegator, target, amount);

        emit ActionExecuted(msg.sender, token, target, amount);

        return success;
    }

    function revoke() external {
        if (msg.sender != scope.delegator) revert NotDelegator();
        scope.active = false;
        emit DelegationRevoked(msg.sender);
    }

    function updateLimits(
        uint256 newMaxPerTx,
        uint256 newDailyLimit,
        uint256 newExpiry
    ) external {
        if (msg.sender != scope.delegator) revert NotDelegator();
        scope.maxAmountPerTx = newMaxPerTx;
        scope.dailyLimit = newDailyLimit;
        scope.expiryTimestamp = newExpiry;
        emit ScopeUpdated(msg.sender);
    }

    function addAllowedToken(address token) external {
        if (msg.sender != scope.delegator) revert NotDelegator();
        if (!allowedTokens[token]) {
            allowedTokens[token] = true;
            _tokenList.push(token);
        }
    }

    function addAllowedTarget(address target) external {
        if (msg.sender != scope.delegator) revert NotDelegator();
        if (!allowedTargets[target]) {
            allowedTargets[target] = true;
            _targetList.push(target);
        }
    }

    function getAllowedTokens() external view returns (address[] memory) {
        return _tokenList;
    }

    function getAllowedTargets() external view returns (address[] memory) {
        return _targetList;
    }

    function remainingDailyLimit() external view returns (uint256) {
        if (block.timestamp >= dailySpend.windowStart + 24 hours) {
            return scope.dailyLimit;
        }
        return scope.dailyLimit > dailySpend.amount
            ? scope.dailyLimit - dailySpend.amount
            : 0;
    }

    function isValidAction(address token, address target, uint256 amount)
        external view returns (bool)
    {
        return scope.active
            && block.timestamp <= scope.expiryTimestamp
            && allowedTokens[token]
            && allowedTargets[target]
            && amount <= scope.maxAmountPerTx;
    }

    function _refreshDailyWindow() internal {
        if (block.timestamp >= dailySpend.windowStart + 24 hours) {
            dailySpend.amount = 0;
            dailySpend.windowStart = block.timestamp;
        }
    }
}
