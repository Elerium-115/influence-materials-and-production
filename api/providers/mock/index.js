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
				"productId": null
			},
			"3": {
				"isDisabled": false,
				"isSelected": true,
				"level": 3,
				"parentItemId": 2,
				"processId": null,
				"productId": "72"
			},
			"4": {
				"isDisabled": false,
				"isSelected": true,
				"level": 4,
				"parentItemId": 3,
				"processId": 60,
				"productId": null
			},
			"5": {
				"isDisabled": false,
				"isSelected": true,
				"level": 5,
				"parentItemId": 4,
				"processId": null,
				"productId": "52"
			},
			"6": {
				"isDisabled": false,
				"isSelected": true,
				"level": 6,
				"parentItemId": 5,
				"processId": 41,
				"productId": null
			},
			"7": {
				"isDisabled": false,
				"isSelected": true,
				"level": 7,
				"parentItemId": 6,
				"processId": null,
				"productId": "29"
			},
			"8": {
				"isDisabled": false,
				"isSelected": true,
				"level": 7,
				"parentItemId": 6,
				"processId": null,
				"productId": "19"
			},
			"9": {
				"isDisabled": false,
				"isSelected": false,
				"level": 7,
				"parentItemId": 6,
				"processId": null,
				"productId": "112"
			},
			"10": {
				"isDisabled": false,
				"isSelected": true,
				"level": 8,
				"parentItemId": 8,
				"processId": 19,
				"productId": null
			},
			"11": {
				"isDisabled": true,
				"isSelected": false,
				"level": 8,
				"parentItemId": 7,
				"processId": 28,
				"productId": null,
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
				"productId": "20"
			},
			"13": {
				"isDisabled": false,
				"isSelected": true,
				"level": 8,
				"parentItemId": 7,
				"processId": 93,
				"productId": null,
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
				"productId": "7"
			},
			"15": {
				"isDisabled": false,
				"isSelected": true,
				"level": 9,
				"parentItemId": 13,
				"processId": null,
				"productId": "63"
			},
			"16": {
				"isDisabled": true,
				"isSelected": false,
				"level": 8,
				"parentItemId": 7,
				"processId": 96,
				"productId": null,
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
				"productId": "57"
			},
			"18": {
				"isDisabled": true,
				"isSelected": false,
				"level": 9,
				"parentItemId": 16,
				"processId": null,
				"productId": "87"
			},
			"19": {
				"isDisabled": false,
				"isSelected": true,
				"level": 10,
				"parentItemId": 15,
				"processId": 51,
				"productId": null,
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
				"productId": "23"
			},
			"21": {
				"isDisabled": false,
				"isSelected": true,
				"level": 11,
				"parentItemId": 19,
				"processId": null,
				"productId": "37"
			},
			"22": {
				"isDisabled": true,
				"isSelected": false,
				"level": 10,
				"parentItemId": 15,
				"processId": 72,
				"productId": null,
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
				"productId": "58"
			},
			"24": {
				"isDisabled": true,
				"isSelected": false,
				"level": 11,
				"parentItemId": 22,
				"processId": null,
				"productId": "55"
			},
			"25": {
				"isDisabled": true,
				"isSelected": false,
				"level": 10,
				"parentItemId": 15,
				"processId": 204,
				"productId": null,
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
				"productId": "95"
			},
			"27": {
				"isDisabled": true,
				"isSelected": false,
				"level": 11,
				"parentItemId": 25,
				"processId": null,
				"productId": "77"
			},
			"28": {
				"isDisabled": true,
				"isSelected": false,
				"level": 11,
				"parentItemId": 25,
				"processId": null,
				"productId": "23"
			},
			"29": {
				"isDisabled": false,
				"isSelected": true,
				"level": 12,
				"parentItemId": 21,
				"processId": 34,
				"productId": null
			},
			"30": {
				"isDisabled": false,
				"isSelected": true,
				"level": 13,
				"parentItemId": 29,
				"processId": null,
				"productId": "21"
			},
			"31": {
				"isDisabled": false,
				"isSelected": false,
				"level": 13,
				"parentItemId": 29,
				"processId": null,
				"productId": "55"
			},
			"32": {
				"isDisabled": false,
				"isSelected": true,
				"level": 14,
				"parentItemId": 30,
				"processId": 21,
				"productId": null
			},
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
				"processId": 300,
				"productId": null
			},
			"3": {
				"isDisabled": false,
				"isSelected": false,
				"level": 3,
				"parentItemId": 2,
				"processId": null,
				"productId": "44"
			},
			"4": {
				"isDisabled": false,
				"isSelected": true,
				"level": 3,
				"parentItemId": 2,
				"processId": null,
				"productId": "69"
			},
			"5": {
				"isDisabled": false,
				"isSelected": true,
				"level": 3,
				"parentItemId": 2,
				"processId": null,
				"productId": "70"
			},
			"6": {
				"isDisabled": false,
				"isSelected": true,
				"level": 4,
				"parentItemId": 5,
				"processId": 58,
				"productId": null
			},
			"7": {
				"isDisabled": false,
				"isSelected": true,
				"level": 5,
				"parentItemId": 6,
				"processId": null,
				"productId": "52"
			},
			"8": {
				"isDisabled": false,
				"isSelected": true,
				"level": 4,
				"parentItemId": 4,
				"processId": 57,
				"productId": null
			},
			"9": {
				"isDisabled": false,
				"isSelected": true,
				"level": 5,
				"parentItemId": 8,
				"processId": null,
				"productId": "52"
			},
			"10": {
				"isDisabled": false,
				"isSelected": true,
				"level": 6,
				"parentItemId": 9,
				"processId": 41,
				"productId": null
			},
			"11": {
				"isDisabled": false,
				"isSelected": true,
				"level": 7,
				"parentItemId": 10,
				"processId": null,
				"productId": "29"
			},
			"12": {
				"isDisabled": false,
				"isSelected": true,
				"level": 7,
				"parentItemId": 10,
				"processId": null,
				"productId": "19"
			},
			"13": {
				"isDisabled": false,
				"isSelected": false,
				"level": 7,
				"parentItemId": 10,
				"processId": null,
				"productId": "112"
			},
			"14": {
				"isDisabled": false,
				"isSelected": true,
				"level": 6,
				"parentItemId": 7,
				"processId": 41,
				"productId": null
			},
			"15": {
				"isDisabled": false,
				"isSelected": true,
				"level": 7,
				"parentItemId": 14,
				"processId": null,
				"productId": "29"
			},
			"16": {
				"isDisabled": false,
				"isSelected": true,
				"level": 7,
				"parentItemId": 14,
				"processId": null,
				"productId": "19"
			},
			"17": {
				"isDisabled": false,
				"isSelected": false,
				"level": 7,
				"parentItemId": 14,
				"processId": null,
				"productId": "112"
			},
			"18": {
				"isDisabled": false,
				"isSelected": true,
				"level": 8,
				"parentItemId": 16,
				"processId": 19,
				"productId": null
			},
			"19": {
				"isDisabled": false,
				"isSelected": true,
				"level": 8,
				"parentItemId": 12,
				"processId": 19,
				"productId": null
			},
			"20": {
				"isDisabled": true,
				"isSelected": false,
				"level": 8,
				"parentItemId": 11,
				"processId": 28,
				"productId": null,
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
				"productId": "20"
			},
			"22": {
				"isDisabled": false,
				"isSelected": true,
				"level": 8,
				"parentItemId": 11,
				"processId": 93,
				"productId": null,
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
				"productId": "7"
			},
			"24": {
				"isDisabled": false,
				"isSelected": true,
				"level": 9,
				"parentItemId": 22,
				"processId": null,
				"productId": "63"
			},
			"25": {
				"isDisabled": true,
				"isSelected": false,
				"level": 8,
				"parentItemId": 11,
				"processId": 96,
				"productId": null,
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
				"productId": "57"
			},
			"27": {
				"isDisabled": true,
				"isSelected": false,
				"level": 9,
				"parentItemId": 25,
				"processId": null,
				"productId": "87"
			},
			"28": {
				"isDisabled": true,
				"isSelected": false,
				"level": 8,
				"parentItemId": 15,
				"processId": 28,
				"productId": null,
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
				"productId": "20"
			},
			"30": {
				"isDisabled": false,
				"isSelected": true,
				"level": 8,
				"parentItemId": 15,
				"processId": 93,
				"productId": null,
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
				"productId": "7"
			},
			"32": {
				"isDisabled": false,
				"isSelected": true,
				"level": 9,
				"parentItemId": 30,
				"processId": null,
				"productId": "63"
			},
			"33": {
				"isDisabled": true,
				"isSelected": false,
				"level": 8,
				"parentItemId": 15,
				"processId": 96,
				"productId": null,
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
				"productId": "57"
			},
			"35": {
				"isDisabled": true,
				"isSelected": false,
				"level": 9,
				"parentItemId": 33,
				"processId": null,
				"productId": "87"
			},
			"36": {
				"isDisabled": false,
				"isSelected": true,
				"level": 10,
				"parentItemId": 32,
				"processId": 51,
				"productId": null,
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
				"productId": "23"
			},
			"38": {
				"isDisabled": false,
				"isSelected": true,
				"level": 11,
				"parentItemId": 36,
				"processId": null,
				"productId": "37"
			},
			"39": {
				"isDisabled": true,
				"isSelected": false,
				"level": 10,
				"parentItemId": 32,
				"processId": 72,
				"productId": null,
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
				"productId": "58"
			},
			"41": {
				"isDisabled": true,
				"isSelected": false,
				"level": 11,
				"parentItemId": 39,
				"processId": null,
				"productId": "55"
			},
			"42": {
				"isDisabled": true,
				"isSelected": false,
				"level": 10,
				"parentItemId": 32,
				"processId": 204,
				"productId": null,
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
				"productId": "95"
			},
			"44": {
				"isDisabled": true,
				"isSelected": false,
				"level": 11,
				"parentItemId": 42,
				"processId": null,
				"productId": "77"
			},
			"45": {
				"isDisabled": true,
				"isSelected": false,
				"level": 11,
				"parentItemId": 42,
				"processId": null,
				"productId": "23"
			},
			"46": {
				"isDisabled": false,
				"isSelected": true,
				"level": 10,
				"parentItemId": 24,
				"processId": 51,
				"productId": null,
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
				"productId": "23"
			},
			"48": {
				"isDisabled": false,
				"isSelected": true,
				"level": 11,
				"parentItemId": 46,
				"processId": null,
				"productId": "37"
			},
			"49": {
				"isDisabled": true,
				"isSelected": false,
				"level": 10,
				"parentItemId": 24,
				"processId": 72,
				"productId": null,
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
				"productId": "58"
			},
			"51": {
				"isDisabled": true,
				"isSelected": false,
				"level": 11,
				"parentItemId": 49,
				"processId": null,
				"productId": "55"
			},
			"52": {
				"isDisabled": true,
				"isSelected": false,
				"level": 10,
				"parentItemId": 24,
				"processId": 204,
				"productId": null,
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
				"productId": "95"
			},
			"54": {
				"isDisabled": true,
				"isSelected": false,
				"level": 11,
				"parentItemId": 52,
				"processId": null,
				"productId": "77"
			},
			"55": {
				"isDisabled": true,
				"isSelected": false,
				"level": 11,
				"parentItemId": 52,
				"processId": null,
				"productId": "23"
			},
			"56": {
				"isDisabled": false,
				"isSelected": true,
				"level": 12,
				"parentItemId": 38,
				"processId": 34,
				"productId": null
			},
			"57": {
				"isDisabled": false,
				"isSelected": true,
				"level": 13,
				"parentItemId": 56,
				"processId": null,
				"productId": "21"
			},
			"58": {
				"isDisabled": false,
				"isSelected": false,
				"level": 13,
				"parentItemId": 56,
				"processId": null,
				"productId": "55"
			},
			"59": {
				"isDisabled": false,
				"isSelected": true,
				"level": 12,
				"parentItemId": 48,
				"processId": 34,
				"productId": null
			},
			"60": {
				"isDisabled": false,
				"isSelected": true,
				"level": 13,
				"parentItemId": 59,
				"processId": null,
				"productId": "21"
			},
			"61": {
				"isDisabled": false,
				"isSelected": false,
				"level": 13,
				"parentItemId": 59,
				"processId": null,
				"productId": "55"
			},
			"62": {
				"isDisabled": false,
				"isSelected": true,
				"level": 14,
				"parentItemId": 57,
				"processId": 21,
				"productId": null
			},
			"63": {
				"isDisabled": false,
				"isSelected": true,
				"level": 14,
				"parentItemId": 60,
				"processId": 21,
				"productId": null
			},
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
				"productId": "19"
			},
			"5": {
				"isDisabled": true,
				"isSelected": false,
				"level": 3,
				"parentItemId": 3,
				"processId": null,
				"productId": "26"
			},
			"6": {
				"isDisabled": true,
				"isSelected": false,
				"level": 2,
				"parentItemId": 1,
				"processId": 47,
				"productId": null,
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
				"productId": "8"
			},
			"8": {
				"isDisabled": true,
				"isSelected": false,
				"level": 3,
				"parentItemId": 6,
				"processId": null,
				"productId": "24"
			},
			"9": {
				"isDisabled": true,
				"isSelected": false,
				"level": 2,
				"parentItemId": 1,
				"processId": 185,
				"productId": null,
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
				"productId": "6"
			},
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
				"productId": null
			},
			"3": {
				"isDisabled": false,
				"isSelected": true,
				"level": 3,
				"parentItemId": 2,
				"processId": null,
				"productId": "5"
			},
			"4": {
				"isDisabled": false,
				"isSelected": true,
				"level": 3,
				"parentItemId": 2,
				"processId": null,
				"productId": "23"
			},
			"5": {
				"isDisabled": false,
				"isSelected": true,
				"level": 3,
				"parentItemId": 2,
				"processId": null,
				"productId": "24"
			},
			"6": {
				"isDisabled": false,
				"isSelected": true,
				"level": 4,
				"parentItemId": 3,
				"processId": 5,
				"productId": null
			},
			"7": {
				"isDisabled": true,
				"isSelected": false,
				"level": 4,
				"parentItemId": 4,
				"processId": 23,
				"productId": null,
				"processVariantItemIds": [
					7,
					9,
					11
				]
			},
			"8": {
				"isDisabled": true,
				"isSelected": false,
				"level": 5,
				"parentItemId": 7,
				"processId": null,
				"productId": "24"
			},
			"9": {
				"isDisabled": true,
				"isSelected": false,
				"level": 4,
				"parentItemId": 4,
				"processId": 185,
				"productId": null,
				"processVariantItemIds": [
					7,
					9,
					11
				]
			},
			"10": {
				"isDisabled": true,
				"isSelected": false,
				"level": 5,
				"parentItemId": 9,
				"processId": null,
				"productId": "6"
			},
			"11": {
				"isDisabled": false,
				"isSelected": true,
				"level": 4,
				"parentItemId": 4,
				"processId": 233,
				"productId": null,
				"processVariantItemIds": [
					7,
					9,
					11
				]
			},
			"12": {
				"isDisabled": false,
				"isSelected": true,
				"level": 5,
				"parentItemId": 11,
				"processId": null,
				"productId": "2"
			},
			"13": {
				"isDisabled": false,
				"isSelected": true,
				"level": 5,
				"parentItemId": 11,
				"processId": null,
				"productId": "5"
			},
			"14": {
				"isDisabled": false,
				"isSelected": true,
				"level": 6,
				"parentItemId": 13,
				"processId": 5,
				"productId": null
			},
			"15": {
				"isDisabled": false,
				"isSelected": true,
				"level": 6,
				"parentItemId": 12,
				"processId": 2,
				"productId": null,
				"processVariantItemIds": [
					15,
					16,
					18,
					21
				]
			},
			"16": {
				"isDisabled": true,
				"isSelected": false,
				"level": 6,
				"parentItemId": 12,
				"processId": 23,
				"productId": null,
				"processVariantItemIds": [
					15,
					16,
					18,
					21
				]
			},
			"17": {
				"isDisabled": true,
				"isSelected": false,
				"level": 7,
				"parentItemId": 16,
				"processId": null,
				"productId": "24"
			},
			"18": {
				"isDisabled": true,
				"isSelected": false,
				"level": 6,
				"parentItemId": 12,
				"processId": 47,
				"productId": null,
				"processVariantItemIds": [
					15,
					16,
					18,
					21
				]
			},
			"19": {
				"isDisabled": true,
				"isSelected": false,
				"level": 7,
				"parentItemId": 18,
				"processId": null,
				"productId": "8"
			},
			"20": {
				"isDisabled": true,
				"isSelected": false,
				"level": 7,
				"parentItemId": 18,
				"processId": null,
				"productId": "24"
			},
			"21": {
				"isDisabled": true,
				"isSelected": false,
				"level": 6,
				"parentItemId": 12,
				"processId": 80,
				"productId": null,
				"processVariantItemIds": [
					15,
					16,
					18,
					21
				]
			},
			"22": {
				"isDisabled": true,
				"isSelected": false,
				"level": 7,
				"parentItemId": 21,
				"processId": null,
				"productId": "3"
			},
			"23": {
				"isDisabled": true,
				"isSelected": false,
				"level": 4,
				"parentItemId": 5,
				"processId": 24,
				"productId": null,
				"processVariantItemIds": [
					23,
					25,
					28
				]
			},
			"24": {
				"isDisabled": true,
				"isSelected": false,
				"level": 5,
				"parentItemId": 23,
				"processId": null,
				"productId": "1"
			},
			"25": {
				"isDisabled": true,
				"isSelected": false,
				"level": 4,
				"parentItemId": 5,
				"processId": 25,
				"productId": null,
				"processVariantItemIds": [
					23,
					25,
					28
				]
			},
			"26": {
				"isDisabled": true,
				"isSelected": false,
				"level": 5,
				"parentItemId": 25,
				"processId": null,
				"productId": "6"
			},
			"27": {
				"isDisabled": true,
				"isSelected": false,
				"level": 5,
				"parentItemId": 25,
				"processId": null,
				"productId": "2"
			},
			"28": {
				"isDisabled": false,
				"isSelected": true,
				"level": 4,
				"parentItemId": 5,
				"processId": 68,
				"productId": null,
				"processVariantItemIds": [
					23,
					25,
					28
				]
			},
			"29": {
				"isDisabled": false,
				"isSelected": true,
				"level": 5,
				"parentItemId": 28,
				"processId": null,
				"productId": "2"
			},
			"30": {
				"isDisabled": false,
				"isSelected": true,
				"level": 5,
				"parentItemId": 28,
				"processId": null,
				"productId": "23"
			},
			"31": {
				"isDisabled": true,
				"isSelected": false,
				"level": 6,
				"parentItemId": 30,
				"processId": 185,
				"productId": null,
				"processVariantItemIds": [
					31,
					33
				]
			},
			"32": {
				"isDisabled": true,
				"isSelected": false,
				"level": 7,
				"parentItemId": 31,
				"processId": null,
				"productId": "6"
			},
			"33": {
				"isDisabled": false,
				"isSelected": true,
				"level": 6,
				"parentItemId": 30,
				"processId": 233,
				"productId": null,
				"processVariantItemIds": [
					31,
					33
				]
			},
			"34": {
				"isDisabled": false,
				"isSelected": true,
				"level": 7,
				"parentItemId": 33,
				"processId": null,
				"productId": "2"
			},
			"35": {
				"isDisabled": false,
				"isSelected": true,
				"level": 7,
				"parentItemId": 33,
				"processId": null,
				"productId": "5"
			},
			"36": {
				"isDisabled": false,
				"isSelected": true,
				"level": 8,
				"parentItemId": 34,
				"processId": 2,
				"productId": null,
				"processVariantItemIds": [
					36,
					37
				]
			},
			"37": {
				"isDisabled": true,
				"isSelected": false,
				"level": 8,
				"parentItemId": 34,
				"processId": 80,
				"productId": null,
				"processVariantItemIds": [
					36,
					37
				]
			},
			"38": {
				"isDisabled": true,
				"isSelected": false,
				"level": 9,
				"parentItemId": 37,
				"processId": null,
				"productId": "3"
			},
			"39": {
				"isDisabled": false,
				"isSelected": true,
				"level": 8,
				"parentItemId": 35,
				"processId": 5,
				"productId": null
			},
			"40": {
				"isDisabled": false,
				"isSelected": true,
				"level": 6,
				"parentItemId": 29,
				"processId": 2,
				"productId": null,
				"processVariantItemIds": [
					40,
					41
				]
			},
			"41": {
				"isDisabled": true,
				"isSelected": false,
				"level": 6,
				"parentItemId": 29,
				"processId": 80,
				"productId": null,
				"processVariantItemIds": [
					40,
					41
				]
			},
			"42": {
				"isDisabled": true,
				"isSelected": false,
				"level": 7,
				"parentItemId": 41,
				"processId": null,
				"productId": "3"
			},
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
				"productId": null
			},
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
				"productId": "24"
			},
			"4": {
				"isDisabled": true,
				"isSelected": false,
				"level": 2,
				"parentItemId": 1,
				"processId": 185,
				"productId": null,
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
				"productId": "6"
			},
			"6": {
				"isDisabled": false,
				"isSelected": true,
				"level": 2,
				"parentItemId": 1,
				"processId": 233,
				"productId": null,
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
				"productId": "2"
			},
			"8": {
				"isDisabled": false,
				"isSelected": true,
				"level": 3,
				"parentItemId": 6,
				"processId": null,
				"productId": "5"
			},
			"9": {
				"isDisabled": false,
				"isSelected": true,
				"level": 4,
				"parentItemId": 8,
				"processId": 5,
				"productId": null
			},
			"10": {
				"isDisabled": false,
				"isSelected": true,
				"level": 4,
				"parentItemId": 7,
				"processId": 2,
				"productId": null,
				"processVariantItemIds": [
					10,
					11,
					13,
					16
				]
			},
			"11": {
				"isDisabled": true,
				"isSelected": false,
				"level": 4,
				"parentItemId": 7,
				"processId": 23,
				"productId": null,
				"processVariantItemIds": [
					10,
					11,
					13,
					16
				]
			},
			"12": {
				"isDisabled": true,
				"isSelected": false,
				"level": 5,
				"parentItemId": 11,
				"processId": null,
				"productId": "24"
			},
			"13": {
				"isDisabled": true,
				"isSelected": false,
				"level": 4,
				"parentItemId": 7,
				"processId": 47,
				"productId": null,
				"processVariantItemIds": [
					10,
					11,
					13,
					16
				]
			},
			"14": {
				"isDisabled": true,
				"isSelected": false,
				"level": 5,
				"parentItemId": 13,
				"processId": null,
				"productId": "8"
			},
			"15": {
				"isDisabled": true,
				"isSelected": false,
				"level": 5,
				"parentItemId": 13,
				"processId": null,
				"productId": "24"
			},
			"16": {
				"isDisabled": true,
				"isSelected": false,
				"level": 4,
				"parentItemId": 7,
				"processId": 80,
				"productId": null,
				"processVariantItemIds": [
					10,
					11,
					13,
					16
				]
			},
			"17": {
				"isDisabled": true,
				"isSelected": false,
				"level": 5,
				"parentItemId": 16,
				"processId": null,
				"productId": "3"
			},
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
				"productId": null
			},
		},
	},
};

module.exports = {
    mockProductionPlanDataById,
};
