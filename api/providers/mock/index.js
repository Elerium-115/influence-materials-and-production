const mockProductionPlanDataById = {
	1: {
		"planned_product_name": "Aluminium",
		"itemDataById": {
			"1": {
			  "isDisabled": false,
			  "isSelected": true,
			  "level": 1,
			  "parentItemId": 0,
			  "processId": null,
			  "productId": 111
			},
			"2": {
			  "isDisabled": false,
			  "isSelected": true,
			  "level": 2,
			  "parentItemId": 1,
			  "processId": 101,
			  "productId": null,
			  "line": {}
			},
			"3": {
			  "isDisabled": false,
			  "isSelected": true,
			  "level": 3,
			  "parentItemId": 2,
			  "processId": null,
			  "productId": 18,
			  "line": {}
			},
			"4": {
			  "isDisabled": false,
			  "isSelected": true,
			  "level": 3,
			  "parentItemId": 2,
			  "processId": null,
			  "productId": 88,
			  "line": {}
			},
			"5": {
			  "isDisabled": false,
			  "isSelected": true,
			  "level": 4,
			  "parentItemId": 4,
			  "processId": 73,
			  "productId": null,
			  "line": {}
			},
			"6": {
			  "isDisabled": false,
			  "isSelected": false,
			  "level": 5,
			  "parentItemId": 5,
			  "processId": null,
			  "productId": 11,
			  "line": {}
			},
			"7": {
			  "isDisabled": false,
			  "isSelected": false,
			  "level": 5,
			  "parentItemId": 5,
			  "processId": null,
			  "productId": 2,
			  "line": {}
			},
			"8": {
			  "isDisabled": false,
			  "isSelected": false,
			  "level": 5,
			  "parentItemId": 5,
			  "processId": null,
			  "productId": 55,
			  "line": {}
			},
			"9": {
			  "isDisabled": false,
			  "isSelected": true,
			  "level": 4,
			  "parentItemId": 3,
			  "processId": 18,
			  "productId": null,
			  "line": {}
			}
		},
	},
	2: {
		"planned_product_name": "Steel",
		"itemDataById": {
			"1": {
			  "isDisabled": false,
			  "isSelected": true,
			  "level": 1,
			  "parentItemId": 0,
			  "processId": null,
			  "productId": 52
			},
			"2": {
			  "isDisabled": false,
			  "isSelected": true,
			  "level": 2,
			  "parentItemId": 1,
			  "processId": 41,
			  "productId": null,
			  "line": {}
			},
			"3": {
			  "isDisabled": false,
			  "isSelected": true,
			  "level": 3,
			  "parentItemId": 2,
			  "processId": null,
			  "productId": 28,
			  "line": {}
			},
			"4": {
			  "isDisabled": false,
			  "isSelected": true,
			  "level": 3,
			  "parentItemId": 2,
			  "processId": null,
			  "productId": 18,
			  "line": {}
			},
			"5": {
			  "isDisabled": false,
			  "isSelected": true,
			  "level": 4,
			  "parentItemId": 4,
			  "processId": 18,
			  "productId": null,
			  "line": {}
			},
			"6": {
			  "isDisabled": true,
			  "isSelected": false,
			  "level": 4,
			  "parentItemId": 3,
			  "processId": 27,
			  "productId": null,
			  "line": {},
			  "processVariantItemIds": [
				6,
				8
			  ]
			},
			"7": {
			  "isDisabled": true,
			  "isSelected": false,
			  "level": 5,
			  "parentItemId": 6,
			  "processId": null,
			  "productId": 19,
			  "line": {}
			},
			"8": {
			  "isDisabled": false,
			  "isSelected": true,
			  "level": 4,
			  "parentItemId": 3,
			  "processId": 93,
			  "productId": null,
			  "line": {},
			  "processVariantItemIds": [
				6,
				8
			  ]
			},
			"9": {
			  "isDisabled": false,
			  "isSelected": false,
			  "level": 5,
			  "parentItemId": 8,
			  "processId": null,
			  "productId": 6,
			  "line": {}
			},
			"10": {
			  "isDisabled": false,
			  "isSelected": true,
			  "level": 5,
			  "parentItemId": 8,
			  "processId": null,
			  "productId": 63,
			  "line": {}
			},
			"11": {
			  "isDisabled": false,
			  "isSelected": true,
			  "level": 6,
			  "parentItemId": 10,
			  "processId": 51,
			  "productId": null,
			  "line": {},
			  "processVariantItemIds": [
				11,
				14
			  ]
			},
			"12": {
			  "isDisabled": false,
			  "isSelected": false,
			  "level": 7,
			  "parentItemId": 11,
			  "processId": null,
			  "productId": 22,
			  "line": {}
			},
			"13": {
			  "isDisabled": false,
			  "isSelected": true,
			  "level": 7,
			  "parentItemId": 11,
			  "processId": null,
			  "productId": 37,
			  "line": {}
			},
			"14": {
			  "isDisabled": true,
			  "isSelected": false,
			  "level": 6,
			  "parentItemId": 10,
			  "processId": 72,
			  "productId": null,
			  "line": {},
			  "processVariantItemIds": [
				11,
				14
			  ]
			},
			"15": {
			  "isDisabled": true,
			  "isSelected": false,
			  "level": 7,
			  "parentItemId": 14,
			  "processId": null,
			  "productId": 12,
			  "line": {}
			},
			"16": {
			  "isDisabled": true,
			  "isSelected": false,
			  "level": 7,
			  "parentItemId": 14,
			  "processId": null,
			  "productId": 55,
			  "line": {}
			},
			"17": {
			  "isDisabled": false,
			  "isSelected": true,
			  "level": 8,
			  "parentItemId": 13,
			  "processId": 34,
			  "productId": null,
			  "line": {}
			},
			"18": {
			  "isDisabled": false,
			  "isSelected": true,
			  "level": 9,
			  "parentItemId": 17,
			  "processId": null,
			  "productId": 20,
			  "line": {}
			},
			"19": {
			  "isDisabled": false,
			  "isSelected": true,
			  "level": 10,
			  "parentItemId": 18,
			  "processId": 20,
			  "productId": null,
			  "line": {}
			}
		},
	},
	3: {
		"planned_product_name": "Carbon Monoxide",
		"itemDataById": {
			"1": {
			  "isDisabled": false,
			  "isSelected": true,
			  "level": 1,
			  "parentItemId": 0,
			  "processId": null,
			  "productId": 6
			},
			"2": {
			  "isDisabled": false,
			  "isSelected": true,
			  "level": 2,
			  "parentItemId": 1,
			  "processId": 6,
			  "productId": null,
			  "line": {}
			}
		},
	},
	4: {
		"planned_product_name": "Feldspar",
		"itemDataById": {
			"1": {
			  "isDisabled": false,
			  "isSelected": true,
			  "level": 1,
			  "parentItemId": 0,
			  "processId": null,
			  "productId": 11
			},
			"2": {
			  "isDisabled": false,
			  "isSelected": true,
			  "level": 2,
			  "parentItemId": 1,
			  "processId": 11,
			  "productId": null,
			  "line": {}
			}
		},
	},
	5: {
		"planned_product_name": "Hydrolox Fuel",
		"itemDataById": {
			"1": {
			  "isDisabled": false,
			  "isSelected": true,
			  "level": 1,
			  "parentItemId": 0,
			  "processId": null,
			  "productId": 58
			},
			"2": {
			  "isDisabled": false,
			  "isSelected": true,
			  "level": 2,
			  "parentItemId": 1,
			  "processId": 47,
			  "productId": null,
			  "line": {}
			},
			"3": {
			  "isDisabled": false,
			  "isSelected": true,
			  "level": 3,
			  "parentItemId": 2,
			  "processId": null,
			  "productId": 1,
			  "line": {}
			},
			"4": {
			  "isDisabled": false,
			  "isSelected": true,
			  "level": 3,
			  "parentItemId": 2,
			  "processId": null,
			  "productId": 22,
			  "line": {}
			},
			"5": {
			  "isDisabled": false,
			  "isSelected": true,
			  "level": 4,
			  "parentItemId": 4,
			  "processId": 22,
			  "productId": null,
			  "line": {}
			},
			"6": {
			  "isDisabled": false,
			  "isSelected": false,
			  "level": 5,
			  "parentItemId": 5,
			  "processId": null,
			  "productId": 0,
			  "line": {}
			},
			"7": {
			  "isDisabled": false,
			  "isSelected": true,
			  "level": 4,
			  "parentItemId": 3,
			  "processId": 1,
			  "productId": null,
			  "line": {},
			  "processVariantItemIds": [
				7,
				8
			  ]
			},
			"8": {
			  "isDisabled": true,
			  "isSelected": false,
			  "level": 4,
			  "parentItemId": 3,
			  "processId": 22,
			  "productId": null,
			  "line": {},
			  "processVariantItemIds": [
				7,
				8
			  ]
			},
			"9": {
			  "isDisabled": true,
			  "isSelected": false,
			  "level": 5,
			  "parentItemId": 8,
			  "processId": null,
			  "productId": 0,
			  "line": {}
			}
		},
	},
	6: {
		"planned_product_name": "Oxygen",
		"itemDataById": {
			"1": {
			  "isDisabled": false,
			  "isSelected": true,
			  "level": 1,
			  "parentItemId": 0,
			  "processId": null,
			  "productId": 22
			},
			"2": {
			  "isDisabled": false,
			  "isSelected": true,
			  "level": 2,
			  "parentItemId": 1,
			  "processId": 22,
			  "productId": null,
			  "line": {}
			},
			"3": {
			  "isDisabled": false,
			  "isSelected": false,
			  "level": 3,
			  "parentItemId": 2,
			  "processId": null,
			  "productId": 0,
			  "line": {}
			}
		},
	},
	7: {
		"planned_product_name": "Water",
		"itemDataById": {
			"1": {
			  "isDisabled": false,
			  "isSelected": true,
			  "level": 1,
			  "parentItemId": 0,
			  "processId": null,
			  "productId": 0
			},
			"2": {
			  "isDisabled": false,
			  "isSelected": true,
			  "level": 2,
			  "parentItemId": 1,
			  "processId": 0,
			  "productId": null,
			  "line": {}
			}
		},
	},
};

module.exports = {
    mockProductionPlanDataById,
};
