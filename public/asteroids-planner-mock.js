const mockAsteroidsPlan = [
	{
		"asteroid_name": "Asteroid #40291",
		"asteroid_type": "M",
		"asteroid_area": 74,
		"planned_products": [
			{
				"planned_product_name": "Aluminium",
				"production_plan_id": "mock1",
			},
			{
				"planned_product_name": "Steel",
				"production_plan_id": "mock2",
			},
		],
	},
	{
		"asteroid_name": "Asteroid #63980",
		"asteroid_type": "CIS",
		"asteroid_area": 48,
		"planned_products": [
			{
				"planned_product_name": "Carbon Monoxide",
				"production_plan_id": "mock3",
			},
			{
				"planned_product_name": "Sulfuric Acid",
				"production_plan_id": null,
			},
		],
	},
	{
		"asteroid_name": "Mock Rock #1",
		"asteroid_type": "SM",
		"asteroid_area": 150,
		"planned_products": [
			{
				"planned_product_name": "Feldspar",
				"production_plan_id": "mock4",
			},
		],
	},
	{
		"asteroid_name": "Mock Rock #2",
		"asteroid_type": "I",
		"asteroid_area": 200,
		"planned_products": [
			{
				"planned_product_name": "Hydrolox Fuel",
				"production_plan_id": "mock5",
			},
			{
				"planned_product_name": "Oxygen",
				"production_plan_id": "mock6",
			},
			{
				"planned_product_name": "Water",
				"production_plan_id": "mock7",
			},
		],
	},
];

/**
 * This code is also duplicated here from the API, to avoid API calls
 * for the example asteroids plan, since it's read-only anyway.
 */
const mockProductionPlanDataById = {
	"mock1": {
		"plannedProductName": "Aluminium",
		"productionPlanId": "mock1",
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
			  "productId": null
			},
			"3": {
			  "isDisabled": false,
			  "isSelected": true,
			  "level": 3,
			  "parentItemId": 2,
			  "processId": null,
			  "productId": 18
			},
			"4": {
			  "isDisabled": false,
			  "isSelected": true,
			  "level": 3,
			  "parentItemId": 2,
			  "processId": null,
			  "productId": 88
			},
			"5": {
			  "isDisabled": false,
			  "isSelected": true,
			  "level": 4,
			  "parentItemId": 4,
			  "processId": 73,
			  "productId": null
			},
			"6": {
			  "isDisabled": false,
			  "isSelected": false,
			  "level": 5,
			  "parentItemId": 5,
			  "processId": null,
			  "productId": 11
			},
			"7": {
			  "isDisabled": false,
			  "isSelected": false,
			  "level": 5,
			  "parentItemId": 5,
			  "processId": null,
			  "productId": 2
			},
			"8": {
			  "isDisabled": false,
			  "isSelected": false,
			  "level": 5,
			  "parentItemId": 5,
			  "processId": null,
			  "productId": 55
			},
			"9": {
			  "isDisabled": false,
			  "isSelected": true,
			  "level": 4,
			  "parentItemId": 3,
			  "processId": 18,
			  "productId": null
			}
		},
	},
	"mock2": {
		"plannedProductName": "Steel",
		"productionPlanId": "mock2",
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
			  "productId": null
			},
			"3": {
			  "isDisabled": false,
			  "isSelected": true,
			  "level": 3,
			  "parentItemId": 2,
			  "processId": null,
			  "productId": 28
			},
			"4": {
			  "isDisabled": false,
			  "isSelected": true,
			  "level": 3,
			  "parentItemId": 2,
			  "processId": null,
			  "productId": 18
			},
			"5": {
			  "isDisabled": false,
			  "isSelected": true,
			  "level": 4,
			  "parentItemId": 4,
			  "processId": 18,
			  "productId": null
			},
			"6": {
			  "isDisabled": true,
			  "isSelected": false,
			  "level": 4,
			  "parentItemId": 3,
			  "processId": 27,
			  "productId": null,
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
			  "productId": 19
			},
			"8": {
			  "isDisabled": false,
			  "isSelected": true,
			  "level": 4,
			  "parentItemId": 3,
			  "processId": 93,
			  "productId": null,
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
			  "productId": 6
			},
			"10": {
			  "isDisabled": false,
			  "isSelected": true,
			  "level": 5,
			  "parentItemId": 8,
			  "processId": null,
			  "productId": 63
			},
			"11": {
			  "isDisabled": false,
			  "isSelected": true,
			  "level": 6,
			  "parentItemId": 10,
			  "processId": 51,
			  "productId": null,
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
			  "productId": 22
			},
			"13": {
			  "isDisabled": false,
			  "isSelected": true,
			  "level": 7,
			  "parentItemId": 11,
			  "processId": null,
			  "productId": 37
			},
			"14": {
			  "isDisabled": true,
			  "isSelected": false,
			  "level": 6,
			  "parentItemId": 10,
			  "processId": 72,
			  "productId": null,
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
			  "productId": 12
			},
			"16": {
			  "isDisabled": true,
			  "isSelected": false,
			  "level": 7,
			  "parentItemId": 14,
			  "processId": null,
			  "productId": 55
			},
			"17": {
			  "isDisabled": false,
			  "isSelected": true,
			  "level": 8,
			  "parentItemId": 13,
			  "processId": 34,
			  "productId": null
			},
			"18": {
			  "isDisabled": false,
			  "isSelected": true,
			  "level": 9,
			  "parentItemId": 17,
			  "processId": null,
			  "productId": 20
			},
			"19": {
			  "isDisabled": false,
			  "isSelected": true,
			  "level": 10,
			  "parentItemId": 18,
			  "processId": 20,
			  "productId": null
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
			  "productId": 6
			},
			"2": {
			  "isDisabled": false,
			  "isSelected": true,
			  "level": 2,
			  "parentItemId": 1,
			  "processId": 6,
			  "productId": null
			}
		},
	},
	"mock4": {
		"plannedProductName": "Feldspar",
		"productionPlanId": "mock4",
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
			  "productId": null
			}
		},
	},
	"mock5": {
		"plannedProductName": "Hydrolox Fuel",
		"productionPlanId": "mock5",
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
			  "productId": null
			},
			"3": {
			  "isDisabled": false,
			  "isSelected": true,
			  "level": 3,
			  "parentItemId": 2,
			  "processId": null,
			  "productId": 1
			},
			"4": {
			  "isDisabled": false,
			  "isSelected": true,
			  "level": 3,
			  "parentItemId": 2,
			  "processId": null,
			  "productId": 22
			},
			"5": {
			  "isDisabled": false,
			  "isSelected": true,
			  "level": 4,
			  "parentItemId": 4,
			  "processId": 22,
			  "productId": null
			},
			"6": {
			  "isDisabled": false,
			  "isSelected": false,
			  "level": 5,
			  "parentItemId": 5,
			  "processId": null,
			  "productId": 0
			},
			"7": {
			  "isDisabled": false,
			  "isSelected": true,
			  "level": 4,
			  "parentItemId": 3,
			  "processId": 1,
			  "productId": null,
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
			  "productId": 0
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
			  "productId": 22
			},
			"2": {
			  "isDisabled": false,
			  "isSelected": true,
			  "level": 2,
			  "parentItemId": 1,
			  "processId": 22,
			  "productId": null
			},
			"3": {
			  "isDisabled": false,
			  "isSelected": false,
			  "level": 3,
			  "parentItemId": 2,
			  "processId": null,
			  "productId": 0
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
			  "productId": 0
			},
			"2": {
			  "isDisabled": false,
			  "isSelected": true,
			  "level": 2,
			  "parentItemId": 1,
			  "processId": 0,
			  "productId": null
			}
		},
	},
};
