/**
 * This code is also duplicated in the client, to avoid API calls
 * for the example asteroids plan, since it's read-only anyway.
 */
const mockProductionPlanDataById = {
	"mock1": {
		"plannedProductName": "Steel Cable",
		"productionPlanId": "mock1",
		"itemDataById": {
			"1": {
			  "isDisabled": false,
			  "isSelected": true,
			  "level": 1,
			  "parentItemId": 0,
			  "processId": null,
			  "productId": "101"
			},
			"2": {
			  "isDisabled": false,
			  "isSelected": true,
			  "level": 2,
			  "parentItemId": 1,
			  "processId": 87,
			  "productId": null,
			  "line": {}
			},
			"3": {
			  "isDisabled": false,
			  "isSelected": true,
			  "level": 3,
			  "parentItemId": 2,
			  "processId": null,
			  "productId": "72",
			  "line": {}
			},
			"4": {
			  "isDisabled": false,
			  "isSelected": true,
			  "level": 4,
			  "parentItemId": 3,
			  "processId": 60,
			  "productId": null,
			  "line": {}
			},
			"5": {
			  "isDisabled": false,
			  "isSelected": true,
			  "level": 5,
			  "parentItemId": 4,
			  "processId": null,
			  "productId": "52",
			  "line": {}
			},
			"6": {
			  "isDisabled": false,
			  "isSelected": true,
			  "level": 6,
			  "parentItemId": 5,
			  "processId": 41,
			  "productId": null,
			  "line": {}
			},
			"7": {
			  "isDisabled": false,
			  "isSelected": true,
			  "level": 7,
			  "parentItemId": 6,
			  "processId": null,
			  "productId": "19",
			  "line": {}
			},
			"8": {
			  "isDisabled": false,
			  "isSelected": true,
			  "level": 7,
			  "parentItemId": 6,
			  "processId": null,
			  "productId": "29",
			  "line": {}
			},
			"9": {
			  "isDisabled": false,
			  "isSelected": false,
			  "level": 7,
			  "parentItemId": 6,
			  "processId": null,
			  "productId": "112",
			  "line": {}
			},
			"10": {
			  "isDisabled": false,
			  "isSelected": true,
			  "level": 8,
			  "parentItemId": 7,
			  "processId": 19,
			  "productId": null,
			  "line": {}
			},
			"11": {
			  "isDisabled": true,
			  "isSelected": false,
			  "level": 8,
			  "parentItemId": 8,
			  "processId": 28,
			  "productId": null,
			  "line": {},
			  "processVariantItemIds": [
				11,
				13,
				16
			  ]
			},
			"12": {
			  "isDisabled": true,
			  "isSelected": false,
			  "level": 9,
			  "parentItemId": 11,
			  "processId": null,
			  "productId": "20",
			  "line": {}
			},
			"13": {
			  "isDisabled": false,
			  "isSelected": true,
			  "level": 8,
			  "parentItemId": 8,
			  "processId": 93,
			  "productId": null,
			  "line": {},
			  "processVariantItemIds": [
				11,
				13,
				16
			  ]
			},
			"14": {
			  "isDisabled": false,
			  "isSelected": false,
			  "level": 9,
			  "parentItemId": 13,
			  "processId": null,
			  "productId": "7",
			  "line": {}
			},
			"15": {
			  "isDisabled": false,
			  "isSelected": true,
			  "level": 9,
			  "parentItemId": 13,
			  "processId": null,
			  "productId": "63",
			  "line": {}
			},
			"16": {
			  "isDisabled": true,
			  "isSelected": false,
			  "level": 8,
			  "parentItemId": 8,
			  "processId": 96,
			  "productId": null,
			  "line": {},
			  "processVariantItemIds": [
				11,
				13,
				16
			  ]
			},
			"17": {
			  "isDisabled": true,
			  "isSelected": false,
			  "level": 9,
			  "parentItemId": 16,
			  "processId": null,
			  "productId": "57",
			  "line": {}
			},
			"18": {
			  "isDisabled": true,
			  "isSelected": false,
			  "level": 9,
			  "parentItemId": 16,
			  "processId": null,
			  "productId": "87",
			  "line": {}
			},
			"19": {
			  "isDisabled": false,
			  "isSelected": true,
			  "level": 10,
			  "parentItemId": 15,
			  "processId": 51,
			  "productId": null,
			  "line": {},
			  "processVariantItemIds": [
				19,
				22,
				25
			  ]
			},
			"20": {
			  "isDisabled": false,
			  "isSelected": false,
			  "level": 11,
			  "parentItemId": 19,
			  "processId": null,
			  "productId": "23",
			  "line": {}
			},
			"21": {
			  "isDisabled": false,
			  "isSelected": true,
			  "level": 11,
			  "parentItemId": 19,
			  "processId": null,
			  "productId": "37",
			  "line": {}
			},
			"22": {
			  "isDisabled": true,
			  "isSelected": false,
			  "level": 10,
			  "parentItemId": 15,
			  "processId": 72,
			  "productId": null,
			  "line": {},
			  "processVariantItemIds": [
				19,
				22,
				25
			  ]
			},
			"23": {
			  "isDisabled": true,
			  "isSelected": false,
			  "level": 11,
			  "parentItemId": 22,
			  "processId": null,
			  "productId": "55",
			  "line": {}
			},
			"24": {
			  "isDisabled": true,
			  "isSelected": false,
			  "level": 11,
			  "parentItemId": 22,
			  "processId": null,
			  "productId": "58",
			  "line": {}
			},
			"25": {
			  "isDisabled": true,
			  "isSelected": false,
			  "level": 10,
			  "parentItemId": 15,
			  "processId": 204,
			  "productId": null,
			  "line": {},
			  "processVariantItemIds": [
				19,
				22,
				25
			  ]
			},
			"26": {
			  "isDisabled": true,
			  "isSelected": false,
			  "level": 11,
			  "parentItemId": 25,
			  "processId": null,
			  "productId": "23",
			  "line": {}
			},
			"27": {
			  "isDisabled": true,
			  "isSelected": false,
			  "level": 11,
			  "parentItemId": 25,
			  "processId": null,
			  "productId": "77",
			  "line": {}
			},
			"28": {
			  "isDisabled": true,
			  "isSelected": false,
			  "level": 11,
			  "parentItemId": 25,
			  "processId": null,
			  "productId": "95",
			  "line": {}
			},
			"29": {
			  "isDisabled": false,
			  "isSelected": true,
			  "level": 12,
			  "parentItemId": 21,
			  "processId": 34,
			  "productId": null,
			  "line": {}
			},
			"30": {
			  "isDisabled": false,
			  "isSelected": true,
			  "level": 13,
			  "parentItemId": 29,
			  "processId": null,
			  "productId": "21",
			  "line": {}
			},
			"31": {
			  "isDisabled": false,
			  "isSelected": false,
			  "level": 13,
			  "parentItemId": 29,
			  "processId": null,
			  "productId": "55",
			  "line": {}
			},
			"32": {
			  "isDisabled": false,
			  "isSelected": true,
			  "level": 14,
			  "parentItemId": 30,
			  "processId": 21,
			  "productId": null,
			  "line": {}
			}
		},
	},
	"mock2": {
		"plannedProductName": "Warehouse",
		"productionPlanId": "mock1",
		"itemDataById": {
			"1": {
			  "isDisabled": false,
			  "isSelected": true,
			  "level": 1,
			  "parentItemId": 0,
			  "processId": null,
			  "productId": "B1"
			},
			"2": {
			  "isDisabled": false,
			  "isSelected": true,
			  "level": 2,
			  "parentItemId": 1,
			  "processId": 246,
			  "productId": null,
			  "line": {}
			},
			"3": {
			  "isDisabled": false,
			  "isSelected": false,
			  "level": 3,
			  "parentItemId": 2,
			  "processId": null,
			  "productId": "44",
			  "line": {}
			},
			"4": {
			  "isDisabled": false,
			  "isSelected": true,
			  "level": 3,
			  "parentItemId": 2,
			  "processId": null,
			  "productId": "69",
			  "line": {}
			},
			"5": {
			  "isDisabled": false,
			  "isSelected": true,
			  "level": 3,
			  "parentItemId": 2,
			  "processId": null,
			  "productId": "70",
			  "line": {}
			},
			"6": {
			  "isDisabled": false,
			  "isSelected": true,
			  "level": 4,
			  "parentItemId": 4,
			  "processId": 57,
			  "productId": null,
			  "line": {}
			},
			"7": {
			  "isDisabled": false,
			  "isSelected": true,
			  "level": 5,
			  "parentItemId": 6,
			  "processId": null,
			  "productId": "52",
			  "line": {}
			},
			"8": {
			  "isDisabled": false,
			  "isSelected": true,
			  "level": 4,
			  "parentItemId": 5,
			  "processId": 58,
			  "productId": null,
			  "line": {}
			},
			"9": {
			  "isDisabled": false,
			  "isSelected": true,
			  "level": 5,
			  "parentItemId": 8,
			  "processId": null,
			  "productId": "52",
			  "line": {}
			},
			"10": {
			  "isDisabled": false,
			  "isSelected": true,
			  "level": 6,
			  "parentItemId": 7,
			  "processId": 41,
			  "productId": null,
			  "line": {}
			},
			"11": {
			  "isDisabled": false,
			  "isSelected": true,
			  "level": 7,
			  "parentItemId": 10,
			  "processId": null,
			  "productId": "19",
			  "line": {}
			},
			"12": {
			  "isDisabled": false,
			  "isSelected": true,
			  "level": 7,
			  "parentItemId": 10,
			  "processId": null,
			  "productId": "29",
			  "line": {}
			},
			"13": {
			  "isDisabled": false,
			  "isSelected": false,
			  "level": 7,
			  "parentItemId": 10,
			  "processId": null,
			  "productId": "112",
			  "line": {}
			},
			"14": {
			  "isDisabled": false,
			  "isSelected": true,
			  "level": 6,
			  "parentItemId": 9,
			  "processId": 41,
			  "productId": null,
			  "line": {}
			},
			"15": {
			  "isDisabled": false,
			  "isSelected": true,
			  "level": 7,
			  "parentItemId": 14,
			  "processId": null,
			  "productId": "19",
			  "line": {}
			},
			"16": {
			  "isDisabled": false,
			  "isSelected": true,
			  "level": 7,
			  "parentItemId": 14,
			  "processId": null,
			  "productId": "29",
			  "line": {}
			},
			"17": {
			  "isDisabled": false,
			  "isSelected": false,
			  "level": 7,
			  "parentItemId": 14,
			  "processId": null,
			  "productId": "112",
			  "line": {}
			},
			"18": {
			  "isDisabled": false,
			  "isSelected": true,
			  "level": 8,
			  "parentItemId": 11,
			  "processId": 19,
			  "productId": null,
			  "line": {}
			},
			"19": {
			  "isDisabled": false,
			  "isSelected": true,
			  "level": 8,
			  "parentItemId": 15,
			  "processId": 19,
			  "productId": null,
			  "line": {}
			},
			"20": {
			  "isDisabled": true,
			  "isSelected": false,
			  "level": 8,
			  "parentItemId": 12,
			  "processId": 28,
			  "productId": null,
			  "line": {},
			  "processVariantItemIds": [
				20,
				22,
				25
			  ]
			},
			"21": {
			  "isDisabled": true,
			  "isSelected": false,
			  "level": 9,
			  "parentItemId": 20,
			  "processId": null,
			  "productId": "20",
			  "line": {}
			},
			"22": {
			  "isDisabled": false,
			  "isSelected": true,
			  "level": 8,
			  "parentItemId": 12,
			  "processId": 93,
			  "productId": null,
			  "line": {},
			  "processVariantItemIds": [
				20,
				22,
				25
			  ]
			},
			"23": {
			  "isDisabled": false,
			  "isSelected": false,
			  "level": 9,
			  "parentItemId": 22,
			  "processId": null,
			  "productId": "7",
			  "line": {}
			},
			"24": {
			  "isDisabled": false,
			  "isSelected": true,
			  "level": 9,
			  "parentItemId": 22,
			  "processId": null,
			  "productId": "63",
			  "line": {}
			},
			"25": {
			  "isDisabled": true,
			  "isSelected": false,
			  "level": 8,
			  "parentItemId": 12,
			  "processId": 96,
			  "productId": null,
			  "line": {},
			  "processVariantItemIds": [
				20,
				22,
				25
			  ]
			},
			"26": {
			  "isDisabled": true,
			  "isSelected": false,
			  "level": 9,
			  "parentItemId": 25,
			  "processId": null,
			  "productId": "57",
			  "line": {}
			},
			"27": {
			  "isDisabled": true,
			  "isSelected": false,
			  "level": 9,
			  "parentItemId": 25,
			  "processId": null,
			  "productId": "87",
			  "line": {}
			},
			"28": {
			  "isDisabled": true,
			  "isSelected": false,
			  "level": 8,
			  "parentItemId": 16,
			  "processId": 28,
			  "productId": null,
			  "line": {},
			  "processVariantItemIds": [
				28,
				30,
				33
			  ]
			},
			"29": {
			  "isDisabled": true,
			  "isSelected": false,
			  "level": 9,
			  "parentItemId": 28,
			  "processId": null,
			  "productId": "20",
			  "line": {}
			},
			"30": {
			  "isDisabled": false,
			  "isSelected": true,
			  "level": 8,
			  "parentItemId": 16,
			  "processId": 93,
			  "productId": null,
			  "line": {},
			  "processVariantItemIds": [
				28,
				30,
				33
			  ]
			},
			"31": {
			  "isDisabled": false,
			  "isSelected": false,
			  "level": 9,
			  "parentItemId": 30,
			  "processId": null,
			  "productId": "7",
			  "line": {}
			},
			"32": {
			  "isDisabled": false,
			  "isSelected": true,
			  "level": 9,
			  "parentItemId": 30,
			  "processId": null,
			  "productId": "63",
			  "line": {}
			},
			"33": {
			  "isDisabled": true,
			  "isSelected": false,
			  "level": 8,
			  "parentItemId": 16,
			  "processId": 96,
			  "productId": null,
			  "line": {},
			  "processVariantItemIds": [
				28,
				30,
				33
			  ]
			},
			"34": {
			  "isDisabled": true,
			  "isSelected": false,
			  "level": 9,
			  "parentItemId": 33,
			  "processId": null,
			  "productId": "57",
			  "line": {}
			},
			"35": {
			  "isDisabled": true,
			  "isSelected": false,
			  "level": 9,
			  "parentItemId": 33,
			  "processId": null,
			  "productId": "87",
			  "line": {}
			},
			"36": {
			  "isDisabled": false,
			  "isSelected": true,
			  "level": 10,
			  "parentItemId": 24,
			  "processId": 51,
			  "productId": null,
			  "line": {},
			  "processVariantItemIds": [
				36,
				39,
				42
			  ]
			},
			"37": {
			  "isDisabled": false,
			  "isSelected": false,
			  "level": 11,
			  "parentItemId": 36,
			  "processId": null,
			  "productId": "23",
			  "line": {}
			},
			"38": {
			  "isDisabled": false,
			  "isSelected": true,
			  "level": 11,
			  "parentItemId": 36,
			  "processId": null,
			  "productId": "37",
			  "line": {}
			},
			"39": {
			  "isDisabled": true,
			  "isSelected": false,
			  "level": 10,
			  "parentItemId": 24,
			  "processId": 72,
			  "productId": null,
			  "line": {},
			  "processVariantItemIds": [
				36,
				39,
				42
			  ]
			},
			"40": {
			  "isDisabled": true,
			  "isSelected": false,
			  "level": 11,
			  "parentItemId": 39,
			  "processId": null,
			  "productId": "55",
			  "line": {}
			},
			"41": {
			  "isDisabled": true,
			  "isSelected": false,
			  "level": 11,
			  "parentItemId": 39,
			  "processId": null,
			  "productId": "58",
			  "line": {}
			},
			"42": {
			  "isDisabled": true,
			  "isSelected": false,
			  "level": 10,
			  "parentItemId": 24,
			  "processId": 204,
			  "productId": null,
			  "line": {},
			  "processVariantItemIds": [
				36,
				39,
				42
			  ]
			},
			"43": {
			  "isDisabled": true,
			  "isSelected": false,
			  "level": 11,
			  "parentItemId": 42,
			  "processId": null,
			  "productId": "23",
			  "line": {}
			},
			"44": {
			  "isDisabled": true,
			  "isSelected": false,
			  "level": 11,
			  "parentItemId": 42,
			  "processId": null,
			  "productId": "77",
			  "line": {}
			},
			"45": {
			  "isDisabled": true,
			  "isSelected": false,
			  "level": 11,
			  "parentItemId": 42,
			  "processId": null,
			  "productId": "95",
			  "line": {}
			},
			"46": {
			  "isDisabled": false,
			  "isSelected": true,
			  "level": 10,
			  "parentItemId": 32,
			  "processId": 51,
			  "productId": null,
			  "line": {},
			  "processVariantItemIds": [
				46,
				49,
				52
			  ]
			},
			"47": {
			  "isDisabled": false,
			  "isSelected": false,
			  "level": 11,
			  "parentItemId": 46,
			  "processId": null,
			  "productId": "23",
			  "line": {}
			},
			"48": {
			  "isDisabled": false,
			  "isSelected": true,
			  "level": 11,
			  "parentItemId": 46,
			  "processId": null,
			  "productId": "37",
			  "line": {}
			},
			"49": {
			  "isDisabled": true,
			  "isSelected": false,
			  "level": 10,
			  "parentItemId": 32,
			  "processId": 72,
			  "productId": null,
			  "line": {},
			  "processVariantItemIds": [
				46,
				49,
				52
			  ]
			},
			"50": {
			  "isDisabled": true,
			  "isSelected": false,
			  "level": 11,
			  "parentItemId": 49,
			  "processId": null,
			  "productId": "55",
			  "line": {}
			},
			"51": {
			  "isDisabled": true,
			  "isSelected": false,
			  "level": 11,
			  "parentItemId": 49,
			  "processId": null,
			  "productId": "58",
			  "line": {}
			},
			"52": {
			  "isDisabled": true,
			  "isSelected": false,
			  "level": 10,
			  "parentItemId": 32,
			  "processId": 204,
			  "productId": null,
			  "line": {},
			  "processVariantItemIds": [
				46,
				49,
				52
			  ]
			},
			"53": {
			  "isDisabled": true,
			  "isSelected": false,
			  "level": 11,
			  "parentItemId": 52,
			  "processId": null,
			  "productId": "23",
			  "line": {}
			},
			"54": {
			  "isDisabled": true,
			  "isSelected": false,
			  "level": 11,
			  "parentItemId": 52,
			  "processId": null,
			  "productId": "77",
			  "line": {}
			},
			"55": {
			  "isDisabled": true,
			  "isSelected": false,
			  "level": 11,
			  "parentItemId": 52,
			  "processId": null,
			  "productId": "95",
			  "line": {}
			},
			"56": {
			  "isDisabled": false,
			  "isSelected": true,
			  "level": 12,
			  "parentItemId": 38,
			  "processId": 34,
			  "productId": null,
			  "line": {}
			},
			"57": {
			  "isDisabled": false,
			  "isSelected": true,
			  "level": 13,
			  "parentItemId": 56,
			  "processId": null,
			  "productId": "21",
			  "line": {}
			},
			"58": {
			  "isDisabled": false,
			  "isSelected": false,
			  "level": 13,
			  "parentItemId": 56,
			  "processId": null,
			  "productId": "55",
			  "line": {}
			},
			"59": {
			  "isDisabled": false,
			  "isSelected": true,
			  "level": 12,
			  "parentItemId": 48,
			  "processId": 34,
			  "productId": null,
			  "line": {}
			},
			"60": {
			  "isDisabled": false,
			  "isSelected": true,
			  "level": 13,
			  "parentItemId": 59,
			  "processId": null,
			  "productId": "21",
			  "line": {}
			},
			"61": {
			  "isDisabled": false,
			  "isSelected": false,
			  "level": 13,
			  "parentItemId": 59,
			  "processId": null,
			  "productId": "55",
			  "line": {}
			},
			"62": {
			  "isDisabled": false,
			  "isSelected": true,
			  "level": 14,
			  "parentItemId": 57,
			  "processId": 21,
			  "productId": null,
			  "line": {}
			},
			"63": {
			  "isDisabled": false,
			  "isSelected": true,
			  "level": 14,
			  "parentItemId": 60,
			  "processId": 21,
			  "productId": null,
			  "line": {}
			}
		},
	},
	"mock3": {
		"plannedProductName": "Carbon Monoxide",
		"productionPlanId": "mock3",
		"itemDataById": {
			"1": {
			  "isDisabled": false,
			  "isSelected": true,
			  "level": 1,
			  "parentItemId": 0,
			  "processId": null,
			  "productId": "7"
			},
			"2": {
			  "isDisabled": false,
			  "isSelected": true,
			  "level": 2,
			  "parentItemId": 1,
			  "processId": 7,
			  "productId": null,
			  "line": {},
			  "processVariantItemIds": [
				2,
				3,
				6,
				9
			  ]
			},
			"3": {
			  "isDisabled": true,
			  "isSelected": false,
			  "level": 2,
			  "parentItemId": 1,
			  "processId": 42,
			  "productId": null,
			  "line": {},
			  "processVariantItemIds": [
				2,
				3,
				6,
				9
			  ]
			},
			"4": {
			  "isDisabled": true,
			  "isSelected": false,
			  "level": 3,
			  "parentItemId": 3,
			  "processId": null,
			  "productId": "19",
			  "line": {}
			},
			"5": {
			  "isDisabled": true,
			  "isSelected": false,
			  "level": 3,
			  "parentItemId": 3,
			  "processId": null,
			  "productId": "26",
			  "line": {}
			},
			"6": {
			  "isDisabled": true,
			  "isSelected": false,
			  "level": 2,
			  "parentItemId": 1,
			  "processId": 47,
			  "productId": null,
			  "line": {},
			  "processVariantItemIds": [
				2,
				3,
				6,
				9
			  ]
			},
			"7": {
			  "isDisabled": true,
			  "isSelected": false,
			  "level": 3,
			  "parentItemId": 6,
			  "processId": null,
			  "productId": "8",
			  "line": {}
			},
			"8": {
			  "isDisabled": true,
			  "isSelected": false,
			  "level": 3,
			  "parentItemId": 6,
			  "processId": null,
			  "productId": "24",
			  "line": {}
			},
			"9": {
			  "isDisabled": true,
			  "isSelected": false,
			  "level": 2,
			  "parentItemId": 1,
			  "processId": 185,
			  "productId": null,
			  "line": {},
			  "processVariantItemIds": [
				2,
				3,
				6,
				9
			  ]
			},
			"10": {
			  "isDisabled": true,
			  "isSelected": false,
			  "level": 3,
			  "parentItemId": 9,
			  "processId": null,
			  "productId": "6",
			  "line": {}
			}
		},
	},
	"mock4": {
		"plannedProductName": "Sulfuric Acid",
		"productionPlanId": "mock4",
		"itemDataById": {
			"1": {
			  "isDisabled": false,
			  "isSelected": true,
			  "level": 1,
			  "parentItemId": 0,
			  "processId": null,
			  "productId": "55"
			},
			"2": {
			  "isDisabled": false,
			  "isSelected": true,
			  "level": 2,
			  "parentItemId": 1,
			  "processId": 44,
			  "productId": null,
			  "line": {}
			},
			"3": {
			  "isDisabled": false,
			  "isSelected": true,
			  "level": 3,
			  "parentItemId": 2,
			  "processId": null,
			  "productId": "5",
			  "line": {}
			},
			"4": {
			  "isDisabled": false,
			  "isSelected": true,
			  "level": 3,
			  "parentItemId": 2,
			  "processId": null,
			  "productId": "23",
			  "line": {}
			},
			"5": {
			  "isDisabled": false,
			  "isSelected": true,
			  "level": 3,
			  "parentItemId": 2,
			  "processId": null,
			  "productId": "24",
			  "line": {}
			},
			"6": {
			  "isDisabled": true,
			  "isSelected": false,
			  "level": 4,
			  "parentItemId": 5,
			  "processId": 24,
			  "productId": null,
			  "line": {},
			  "processVariantItemIds": [
				6,
				8,
				11
			  ]
			},
			"7": {
			  "isDisabled": true,
			  "isSelected": false,
			  "level": 5,
			  "parentItemId": 6,
			  "processId": null,
			  "productId": "1",
			  "line": {}
			},
			"8": {
			  "isDisabled": true,
			  "isSelected": false,
			  "level": 4,
			  "parentItemId": 5,
			  "processId": 25,
			  "productId": null,
			  "line": {},
			  "processVariantItemIds": [
				6,
				8,
				11
			  ]
			},
			"9": {
			  "isDisabled": true,
			  "isSelected": false,
			  "level": 5,
			  "parentItemId": 8,
			  "processId": null,
			  "productId": "2",
			  "line": {}
			},
			"10": {
			  "isDisabled": true,
			  "isSelected": false,
			  "level": 5,
			  "parentItemId": 8,
			  "processId": null,
			  "productId": "6",
			  "line": {}
			},
			"11": {
			  "isDisabled": false,
			  "isSelected": true,
			  "level": 4,
			  "parentItemId": 5,
			  "processId": 68,
			  "productId": null,
			  "line": {},
			  "processVariantItemIds": [
				6,
				8,
				11
			  ]
			},
			"12": {
			  "isDisabled": false,
			  "isSelected": true,
			  "level": 5,
			  "parentItemId": 11,
			  "processId": null,
			  "productId": "2",
			  "line": {}
			},
			"13": {
			  "isDisabled": false,
			  "isSelected": true,
			  "level": 5,
			  "parentItemId": 11,
			  "processId": null,
			  "productId": "23",
			  "line": {}
			},
			"14": {
			  "isDisabled": true,
			  "isSelected": false,
			  "level": 4,
			  "parentItemId": 4,
			  "processId": 23,
			  "productId": null,
			  "line": {},
			  "processVariantItemIds": [
				14,
				16,
				18
			  ]
			},
			"15": {
			  "isDisabled": true,
			  "isSelected": false,
			  "level": 5,
			  "parentItemId": 14,
			  "processId": null,
			  "productId": "24",
			  "line": {}
			},
			"16": {
			  "isDisabled": true,
			  "isSelected": false,
			  "level": 4,
			  "parentItemId": 4,
			  "processId": 185,
			  "productId": null,
			  "line": {},
			  "processVariantItemIds": [
				14,
				16,
				18
			  ]
			},
			"17": {
			  "isDisabled": true,
			  "isSelected": false,
			  "level": 5,
			  "parentItemId": 16,
			  "processId": null,
			  "productId": "6",
			  "line": {}
			},
			"18": {
			  "isDisabled": false,
			  "isSelected": true,
			  "level": 4,
			  "parentItemId": 4,
			  "processId": 233,
			  "productId": null,
			  "line": {},
			  "processVariantItemIds": [
				14,
				16,
				18
			  ]
			},
			"19": {
			  "isDisabled": false,
			  "isSelected": true,
			  "level": 5,
			  "parentItemId": 18,
			  "processId": null,
			  "productId": "2",
			  "line": {}
			},
			"20": {
			  "isDisabled": false,
			  "isSelected": true,
			  "level": 5,
			  "parentItemId": 18,
			  "processId": null,
			  "productId": "5",
			  "line": {}
			},
			"21": {
			  "isDisabled": false,
			  "isSelected": true,
			  "level": 4,
			  "parentItemId": 3,
			  "processId": 5,
			  "productId": null,
			  "line": {}
			},
			"22": {
			  "isDisabled": true,
			  "isSelected": false,
			  "level": 6,
			  "parentItemId": 13,
			  "processId": 185,
			  "productId": null,
			  "line": {},
			  "processVariantItemIds": [
				22,
				24
			  ]
			},
			"23": {
			  "isDisabled": true,
			  "isSelected": false,
			  "level": 7,
			  "parentItemId": 22,
			  "processId": null,
			  "productId": "6",
			  "line": {}
			},
			"24": {
			  "isDisabled": false,
			  "isSelected": true,
			  "level": 6,
			  "parentItemId": 13,
			  "processId": 233,
			  "productId": null,
			  "line": {},
			  "processVariantItemIds": [
				22,
				24
			  ]
			},
			"25": {
			  "isDisabled": false,
			  "isSelected": true,
			  "level": 7,
			  "parentItemId": 24,
			  "processId": null,
			  "productId": "2",
			  "line": {}
			},
			"26": {
			  "isDisabled": false,
			  "isSelected": true,
			  "level": 7,
			  "parentItemId": 24,
			  "processId": null,
			  "productId": "5",
			  "line": {}
			},
			"27": {
			  "isDisabled": false,
			  "isSelected": true,
			  "level": 6,
			  "parentItemId": 12,
			  "processId": 2,
			  "productId": null,
			  "line": {},
			  "processVariantItemIds": [
				27,
				28
			  ]
			},
			"28": {
			  "isDisabled": true,
			  "isSelected": false,
			  "level": 6,
			  "parentItemId": 12,
			  "processId": 80,
			  "productId": null,
			  "line": {},
			  "processVariantItemIds": [
				27,
				28
			  ]
			},
			"29": {
			  "isDisabled": true,
			  "isSelected": false,
			  "level": 7,
			  "parentItemId": 28,
			  "processId": null,
			  "productId": "3",
			  "line": {}
			},
			"30": {
			  "isDisabled": false,
			  "isSelected": true,
			  "level": 6,
			  "parentItemId": 20,
			  "processId": 5,
			  "productId": null,
			  "line": {}
			},
			"31": {
			  "isDisabled": false,
			  "isSelected": true,
			  "level": 8,
			  "parentItemId": 26,
			  "processId": 5,
			  "productId": null,
			  "line": {}
			},
			"32": {
			  "isDisabled": false,
			  "isSelected": true,
			  "level": 6,
			  "parentItemId": 19,
			  "processId": 2,
			  "productId": null,
			  "line": {},
			  "processVariantItemIds": [
				32,
				33,
				35,
				38
			  ]
			},
			"33": {
			  "isDisabled": true,
			  "isSelected": false,
			  "level": 6,
			  "parentItemId": 19,
			  "processId": 23,
			  "productId": null,
			  "line": {},
			  "processVariantItemIds": [
				32,
				33,
				35,
				38
			  ]
			},
			"34": {
			  "isDisabled": true,
			  "isSelected": false,
			  "level": 7,
			  "parentItemId": 33,
			  "processId": null,
			  "productId": "24",
			  "line": {}
			},
			"35": {
			  "isDisabled": true,
			  "isSelected": false,
			  "level": 6,
			  "parentItemId": 19,
			  "processId": 47,
			  "productId": null,
			  "line": {},
			  "processVariantItemIds": [
				32,
				33,
				35,
				38
			  ]
			},
			"36": {
			  "isDisabled": true,
			  "isSelected": false,
			  "level": 7,
			  "parentItemId": 35,
			  "processId": null,
			  "productId": "8",
			  "line": {}
			},
			"37": {
			  "isDisabled": true,
			  "isSelected": false,
			  "level": 7,
			  "parentItemId": 35,
			  "processId": null,
			  "productId": "24",
			  "line": {}
			},
			"38": {
			  "isDisabled": true,
			  "isSelected": false,
			  "level": 6,
			  "parentItemId": 19,
			  "processId": 80,
			  "productId": null,
			  "line": {},
			  "processVariantItemIds": [
				32,
				33,
				35,
				38
			  ]
			},
			"39": {
			  "isDisabled": true,
			  "isSelected": false,
			  "level": 7,
			  "parentItemId": 38,
			  "processId": null,
			  "productId": "3",
			  "line": {}
			},
			"40": {
			  "isDisabled": false,
			  "isSelected": true,
			  "level": 8,
			  "parentItemId": 25,
			  "processId": 2,
			  "productId": null,
			  "line": {},
			  "processVariantItemIds": [
				40,
				41
			  ]
			},
			"41": {
			  "isDisabled": true,
			  "isSelected": false,
			  "level": 8,
			  "parentItemId": 25,
			  "processId": 80,
			  "productId": null,
			  "line": {},
			  "processVariantItemIds": [
				40,
				41
			  ]
			},
			"42": {
			  "isDisabled": true,
			  "isSelected": false,
			  "level": 9,
			  "parentItemId": 41,
			  "processId": null,
			  "productId": "3",
			  "line": {}
			}
		},
	},
	"mock5": {
		"plannedProductName": "Feldspar",
		"productionPlanId": "mock5",
		"itemDataById": {
			"1": {
			  "isDisabled": false,
			  "isSelected": true,
			  "level": 1,
			  "parentItemId": 0,
			  "processId": null,
			  "productId": "12"
			},
			"2": {
			  "isDisabled": false,
			  "isSelected": true,
			  "level": 2,
			  "parentItemId": 1,
			  "processId": 12,
			  "productId": null,
			  "line": {}
			}
		},
	},
	"mock6": {
		"plannedProductName": "Oxygen",
		"productionPlanId": "mock6",
		"itemDataById": {
			"1": {
			  "isDisabled": false,
			  "isSelected": true,
			  "level": 1,
			  "parentItemId": 0,
			  "processId": null,
			  "productId": "23"
			},
			"2": {
			  "isDisabled": true,
			  "isSelected": false,
			  "level": 2,
			  "parentItemId": 1,
			  "processId": 23,
			  "productId": null,
			  "line": {},
			  "processVariantItemIds": [
				2,
				4,
				6
			  ]
			},
			"3": {
			  "isDisabled": true,
			  "isSelected": false,
			  "level": 3,
			  "parentItemId": 2,
			  "processId": null,
			  "productId": "24",
			  "line": {}
			},
			"4": {
			  "isDisabled": true,
			  "isSelected": false,
			  "level": 2,
			  "parentItemId": 1,
			  "processId": 185,
			  "productId": null,
			  "line": {},
			  "processVariantItemIds": [
				2,
				4,
				6
			  ]
			},
			"5": {
			  "isDisabled": true,
			  "isSelected": false,
			  "level": 3,
			  "parentItemId": 4,
			  "processId": null,
			  "productId": "6",
			  "line": {}
			},
			"6": {
			  "isDisabled": false,
			  "isSelected": true,
			  "level": 2,
			  "parentItemId": 1,
			  "processId": 233,
			  "productId": null,
			  "line": {},
			  "processVariantItemIds": [
				2,
				4,
				6
			  ]
			},
			"7": {
			  "isDisabled": false,
			  "isSelected": true,
			  "level": 3,
			  "parentItemId": 6,
			  "processId": null,
			  "productId": "2",
			  "line": {}
			},
			"8": {
			  "isDisabled": false,
			  "isSelected": true,
			  "level": 3,
			  "parentItemId": 6,
			  "processId": null,
			  "productId": "5",
			  "line": {}
			},
			"9": {
			  "isDisabled": false,
			  "isSelected": true,
			  "level": 4,
			  "parentItemId": 7,
			  "processId": 2,
			  "productId": null,
			  "line": {},
			  "processVariantItemIds": [
				9,
				10,
				12,
				15
			  ]
			},
			"10": {
			  "isDisabled": true,
			  "isSelected": false,
			  "level": 4,
			  "parentItemId": 7,
			  "processId": 23,
			  "productId": null,
			  "line": {},
			  "processVariantItemIds": [
				9,
				10,
				12,
				15
			  ]
			},
			"11": {
			  "isDisabled": true,
			  "isSelected": false,
			  "level": 5,
			  "parentItemId": 10,
			  "processId": null,
			  "productId": "24",
			  "line": {}
			},
			"12": {
			  "isDisabled": true,
			  "isSelected": false,
			  "level": 4,
			  "parentItemId": 7,
			  "processId": 47,
			  "productId": null,
			  "line": {},
			  "processVariantItemIds": [
				9,
				10,
				12,
				15
			  ]
			},
			"13": {
			  "isDisabled": true,
			  "isSelected": false,
			  "level": 5,
			  "parentItemId": 12,
			  "processId": null,
			  "productId": "8",
			  "line": {}
			},
			"14": {
			  "isDisabled": true,
			  "isSelected": false,
			  "level": 5,
			  "parentItemId": 12,
			  "processId": null,
			  "productId": "24",
			  "line": {}
			},
			"15": {
			  "isDisabled": true,
			  "isSelected": false,
			  "level": 4,
			  "parentItemId": 7,
			  "processId": 80,
			  "productId": null,
			  "line": {},
			  "processVariantItemIds": [
				9,
				10,
				12,
				15
			  ]
			},
			"16": {
			  "isDisabled": true,
			  "isSelected": false,
			  "level": 5,
			  "parentItemId": 15,
			  "processId": null,
			  "productId": "3",
			  "line": {}
			},
			"17": {
			  "isDisabled": false,
			  "isSelected": true,
			  "level": 4,
			  "parentItemId": 8,
			  "processId": 5,
			  "productId": null,
			  "line": {}
			}
		  },
	},
	"mock7": {
		"plannedProductName": "Water",
		"productionPlanId": "mock7",
		"itemDataById": {
			"1": {
			  "isDisabled": false,
			  "isSelected": true,
			  "level": 1,
			  "parentItemId": 0,
			  "processId": null,
			  "productId": "1"
			},
			"2": {
			  "isDisabled": false,
			  "isSelected": true,
			  "level": 2,
			  "parentItemId": 1,
			  "processId": 1,
			  "productId": null,
			  "line": {}
			}
		},
	},
};

module.exports = {
    mockProductionPlanDataById,
};
