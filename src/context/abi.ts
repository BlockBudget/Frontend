export const abi = [
	{
		inputs: [
			{
				internalType: "address",
				name: "owner",
				type: "address",
			},
		],
		name: "OwnableInvalidOwner",
		type: "error",
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "account",
				type: "address",
			},
		],
		name: "OwnableUnauthorizedAccount",
		type: "error",
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "userAddress",
				type: "address",
			},
			{
				indexed: false,
				internalType: "string",
				name: "userName",
				type: "string",
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "totalBudget",
				type: "uint256",
			},
		],
		name: "BudgetCreated",
		type: "event",
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "bytes32",
				name: "campaignId",
				type: "bytes32",
			},
			{
				indexed: false,
				internalType: "address",
				name: "contributor",
				type: "address",
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "amount",
				type: "uint256",
			},
		],
		name: "ContributionReceived",
		type: "event",
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "userAddress",
				type: "address",
			},
			{
				indexed: false,
				internalType: "string",
				name: "reason",
				type: "string",
			},
		],
		name: "EmergencyTriggered",
		type: "event",
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "userAddress",
				type: "address",
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "amount",
				type: "uint256",
			},
			{
				indexed: false,
				internalType: "string",
				name: "category",
				type: "string",
			},
		],
		name: "ExpenseRecorded",
		type: "event",
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "userAddress",
				type: "address",
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "amount",
				type: "uint256",
			},
			{
				indexed: false,
				internalType: "string",
				name: "source",
				type: "string",
			},
		],
		name: "IncomeRecorded",
		type: "event",
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "previousOwner",
				type: "address",
			},
			{
				indexed: true,
				internalType: "address",
				name: "newOwner",
				type: "address",
			},
		],
		name: "OwnershipTransferred",
		type: "event",
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "userAddress",
				type: "address",
			},
			{
				indexed: false,
				internalType: "string",
				name: "name",
				type: "string",
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "timestamp",
				type: "uint256",
			},
		],
		name: "UserRegistered",
		type: "event",
	},
	{
		inputs: [
			{
				internalType: "bytes32",
				name: "campaignId",
				type: "bytes32",
			},
		],
		name: "contributeToCompaign",
		outputs: [
			{
				internalType: "bool",
				name: "",
				type: "bool",
			},
		],
		stateMutability: "payable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "_timeframe",
				type: "uint256",
			},
			{
				internalType: "uint256",
				name: "_totalBudget",
				type: "uint256",
			},
			{
				internalType: "string[]",
				name: "_categories",
				type: "string[]",
			},
			{
				internalType: "uint256[]",
				name: "_limits",
				type: "uint256[]",
			},
		],
		name: "createBudget",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "string",
				name: "name",
				type: "string",
			},
			{
				internalType: "string",
				name: "description",
				type: "string",
			},
			{
				internalType: "uint256",
				name: "targetAmount",
				type: "uint256",
			},
			{
				internalType: "uint256",
				name: "duration",
				type: "uint256",
			},
			{
				internalType: "bool",
				name: "isPrivate",
				type: "bool",
			},
		],
		name: "createCampaign",
		outputs: [
			{
				internalType: "bytes32",
				name: "",
				type: "bytes32",
			},
		],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "string",
				name: "name",
				type: "string",
			},
			{
				internalType: "uint256",
				name: "targetAmount",
				type: "uint256",
			},
			{
				internalType: "uint256",
				name: "deadline",
				type: "uint256",
			},
			{
				internalType: "enum GoalBasedLib.GoalType",
				name: "goalType",
				type: "uint8",
			},
			{
				internalType: "enum GoalBasedLib.SavingFrequency",
				name: "frequency",
				type: "uint8",
			},
			{
				internalType: "uint256",
				name: "minContributionAmount",
				type: "uint256",
			},
			{
				internalType: "bool",
				name: "isFlexible",
				type: "bool",
			},
			{
				internalType: "bool",
				name: "autoContribute",
				type: "bool",
			},
			{
				internalType: "uint256",
				name: "penaltyRate",
				type: "uint256",
			},
		],
		name: "createSavingsGoal",
		outputs: [
			{
				internalType: "bytes32",
				name: "",
				type: "bytes32",
			},
		],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "enum TimeLockedLib.AccountType",
				name: "accountType",
				type: "uint8",
			},
			{
				internalType: "enum TimeLockedLib.InterestType",
				name: "interestType",
				type: "uint8",
			},
			{
				internalType: "uint256",
				name: "lockDuration",
				type: "uint256",
			},
			{
				internalType: "uint256",
				name: "initialDeposit",
				type: "uint256",
			},
		],
		name: "createTimeLockedAccount",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "",
				type: "address",
			},
			{
				internalType: "address",
				name: "",
				type: "address",
			},
		],
		name: "friendsList",
		outputs: [
			{
				internalType: "bool",
				name: "",
				type: "bool",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "bytes32",
				name: "campaignId",
				type: "bytes32",
			},
		],
		name: "getCampaignDetails",
		outputs: [
			{
				internalType: "string",
				name: "name",
				type: "string",
			},
			{
				internalType: "string",
				name: "description",
				type: "string",
			},
			{
				internalType: "address",
				name: "owner",
				type: "address",
			},
			{
				internalType: "uint256",
				name: "targetAmount",
				type: "uint256",
			},
			{
				internalType: "uint256",
				name: "deadline",
				type: "uint256",
			},
			{
				internalType: "uint256",
				name: "totalContributed",
				type: "uint256",
			},
			{
				internalType: "uint256",
				name: "contributorCount",
				type: "uint256",
			},
			{
				internalType: "bool",
				name: "isActive",
				type: "bool",
			},
			{
				internalType: "bool",
				name: "isPrivate",
				type: "bool",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "bytes32",
				name: "goalId",
				type: "bytes32",
			},
		],
		name: "getGoalDetails",
		outputs: [
			{
				internalType: "string",
				name: "name",
				type: "string",
			},
			{
				internalType: "uint256",
				name: "targetAmount",
				type: "uint256",
			},
			{
				internalType: "uint256",
				name: "currentAmount",
				type: "uint256",
			},
			{
				internalType: "uint256",
				name: "deadline",
				type: "uint256",
			},
			{
				internalType: "enum GoalBasedLib.GoalStatus",
				name: "status",
				type: "uint8",
			},
			{
				internalType: "uint256",
				name: "milestoneCount",
				type: "uint256",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "user",
				type: "address",
			},
		],
		name: "getTimeLockedAccountDetails",
		outputs: [
			{
				internalType: "uint256",
				name: "balance",
				type: "uint256",
			},
			{
				internalType: "uint256",
				name: "accruedInterest",
				type: "uint256",
			},
			{
				internalType: "uint256",
				name: "lockEndTime",
				type: "uint256",
			},
			{
				internalType: "bool",
				name: "isActive",
				type: "bool",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "user",
				type: "address",
			},
		],
		name: "getUserProfile",
		outputs: [
			{
				internalType: "string",
				name: "name",
				type: "string",
			},
			{
				internalType: "address",
				name: "userAddress",
				type: "address",
			},
			{
				internalType: "uint256",
				name: "registrationDate",
				type: "uint256",
			},
			{
				internalType: "bool",
				name: "isRegistered",
				type: "bool",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [],
		name: "owner",
		outputs: [
			{
				internalType: "address",
				name: "",
				type: "address",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "string",
				name: "name",
				type: "string",
			},
		],
		name: "registerUser",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [],
		name: "renounceOwnership",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "newOwner",
				type: "address",
			},
		],
		name: "transferOwnership",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "",
				type: "address",
			},
		],
		name: "userBudgets",
		outputs: [
			{
				internalType: "string",
				name: "userName",
				type: "string",
			},
			{
				internalType: "address",
				name: "userAddress",
				type: "address",
			},
			{
				internalType: "uint256",
				name: "timeframe",
				type: "uint256",
			},
			{
				internalType: "uint256",
				name: "totalBudget",
				type: "uint256",
			},
			{
				internalType: "uint256",
				name: "startDate",
				type: "uint256",
			},
			{
				internalType: "uint256",
				name: "endDate",
				type: "uint256",
			},
			{
				internalType: "bool",
				name: "isActive",
				type: "bool",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "",
				type: "address",
			},
			{
				internalType: "uint256",
				name: "",
				type: "uint256",
			},
		],
		name: "userExpenses",
		outputs: [
			{
				internalType: "uint256",
				name: "amount",
				type: "uint256",
			},
			{
				internalType: "string",
				name: "category",
				type: "string",
			},
			{
				internalType: "uint256",
				name: "date",
				type: "uint256",
			},
			{
				internalType: "string",
				name: "description",
				type: "string",
			},
			{
				internalType: "string",
				name: "attachmentHash",
				type: "string",
			},
			{
				internalType: "bool",
				name: "isRecurring",
				type: "bool",
			},
			{
				internalType: "uint256",
				name: "recurringInterval",
				type: "uint256",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "",
				type: "address",
			},
			{
				internalType: "uint256",
				name: "",
				type: "uint256",
			},
		],
		name: "userIncomes",
		outputs: [
			{
				internalType: "uint256",
				name: "amount",
				type: "uint256",
			},
			{
				internalType: "string",
				name: "source",
				type: "string",
			},
			{
				internalType: "uint256",
				name: "date",
				type: "uint256",
			},
			{
				internalType: "string",
				name: "category",
				type: "string",
			},
			{
				internalType: "bool",
				name: "isRecurring",
				type: "bool",
			},
			{
				internalType: "uint256",
				name: "recurringInterval",
				type: "uint256",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "",
				type: "address",
			},
		],
		name: "userProfiles",
		outputs: [
			{
				internalType: "string",
				name: "name",
				type: "string",
			},
			{
				internalType: "address",
				name: "userAddress",
				type: "address",
			},
			{
				internalType: "bool",
				name: "isRegistered",
				type: "bool",
			},
			{
				internalType: "uint256",
				name: "registrationDate",
				type: "uint256",
			},
		],
		stateMutability: "view",
		type: "function",
	},
];
