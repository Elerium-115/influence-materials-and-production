/**
 * Sample format for the asteroids plan, NOT used anywhere from this const.
 * The actual "asteroidsPlan" is generated via "regenerateAndSaveAsteroidsPlan".
 */
const mockAsteroidsPlan = [
	{
		"asteroid_name": "Asteroid #39744",
		"asteroid_type": "M",
		"asteroid_area": 75,
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
		"asteroid_name": "Asteroid #60980",
		"asteroid_type": "CIS",
		"asteroid_area": 50,
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

const mockAsteroidsPlannerTree = [
	{
		"asteroid_name": "Asteroid #39744",
		"asteroid_type": "M",
		"asteroid_area": 75,
		"planned_products": [
			{
				"planned_product_name": "Aluminium",
				"production_plan_id": "mock1",
				"intermediate_products": [
					{
						"intermediate_product_name": "Alumina"
					},
					{
						"intermediate_product_name": "Graphite"
					},
				],
				"shopping_list":
				{
					"inputs": [
						{
							"input_name": "Ammonia"
						},
						{
							"input_name": "Feldspar"
						},
						{
							"input_name": "Sulfuric Acid"
						},
					],
					"buildings": [
						{
							"building_name": "Extractor"
						},
						{
							"building_name": "Refinery"
						},
					],
					"modules": [],
					"spectral_types": ["M"],
				},
			},
			{
				"planned_product_name": "Steel",
				"production_plan_id": "mock2",
				"intermediate_products": [
					{
						"intermediate_product_name": "Graphite"
					},
					{
						"intermediate_product_name": "Iron"
					},
					{
						"intermediate_product_name": "Iron Oxide"
					},
					{
						"intermediate_product_name": "Iron Sulfide"
					},
					{
						"intermediate_product_name": "Troilite"
					},
				],
				"shopping_list":
				{
					"inputs": [
						{
							"input_name": "Carbon Monoxide"
						},
						{
							"input_name": "Oxygen"
						},
					],
					"buildings": [
						{
							"building_name": "Extractor"
						},
						{
							"building_name": "Refinery"
						},
					],
					"modules": [],
					"spectral_types": ["M"],
				},
			},
		],
	},
	{
		"asteroid_name": "Asteroid #60980",
		"asteroid_type": "CIS",
		"asteroid_area": 50,
		"planned_products": [
			{
				"planned_product_name": "Carbon Monoxide",
				"production_plan_id": "mock3",
				"intermediate_products": [],
				"shopping_list":
				{
					"inputs": [],
					"buildings": [
						{
							"building_name": "Extractor"
						},
					],
					"modules": [],
					"spectral_types": ["C", "I"],
				},
			},
			{
				"planned_product_name": "Sulfuric Acid",
				"production_plan_id": null,
				"intermediate_products": [],
				"shopping_list":
				{
					"inputs": [],
					"buildings": [],
					"modules": [],
					"spectral_types": [],
				},
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
				"intermediate_products": [],
				"shopping_list":
				{
					"inputs": [],
					"buildings": [
						{
							"building_name": "Extractor"
						},
					],
					"modules": [],
					"spectral_types": ["S"],
				},
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
				"intermediate_products": [
					{
						"intermediate_product_name": "Hydrogen"
					},
					{
						"intermediate_product_name": "Oxygen"
					},
				],
				"shopping_list":
				{
					"inputs": [
						{
							"input_name": "Water"
						},
					],
					"buildings": [
						{
							"building_name": "Extractor"
						},
						{
							"building_name": "Refinery"
						},
					],
					"modules": [],
					"spectral_types": ["I"],
				},
			},
			{
				"planned_product_name": "Oxygen",
				"production_plan_id": "mock6",
				"intermediate_products": [],
				"shopping_list":
				{
					"inputs": [
						{
							"input_name": "Water"
						},
					],
					"buildings": [
						{
							"building_name": "Refinery"
						},
					],
					"modules": [],
					"spectral_types": [],
				},
			},
			{
				"planned_product_name": "Water",
				"production_plan_id": "mock7",
				"intermediate_products": [],
				"shopping_list":
				{
					"inputs": [],
					"buildings": [
						{
							"building_name": "Extractor"
						},
					],
					"modules": [],
					"spectral_types": ["C", "I"],
				},
			},
		],
	}
];
