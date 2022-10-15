
/**
 * Example of asteroids plan format, NOT used anywhere from this const.
 * The actual "asteroidsPlan" is generated via "updateAsteroidsPlanFromTree".
 */
const mockAsteroidsPlan = [
	{
		"asteroid_name": "Asteroid #39744",
		"asteroid_type": "M",
		"asteroid_area": 75,
		"production_plan_ids": [1, 2],
	},
	{
		"asteroid_name": "Asteroid #60980",
		"asteroid_type": "CIS",
		"asteroid_area": 50,
		"production_plan_ids": [3],
	},
	{
		"asteroid_name": "Mock Rock #1",
		"asteroid_type": "SM",
		"asteroid_area": 150,
		"production_plan_ids": [4],
	},
	{
		"asteroid_name": "Mock Rock #2",
		"asteroid_type": "I",
		"asteroid_area": 200,
		"production_plan_ids": [5, 6, 7],
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
				"production_plan_id": 1,
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
				"production_plan_id": 2,
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
				"production_plan_id": 3,
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
	},
	{
		"asteroid_name": "Mock Rock #1",
		"asteroid_type": "SM",
		"asteroid_area": 150,
		"planned_products": [
			{
				"planned_product_name": "Feldspar",
				"production_plan_id": 4,
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
				"production_plan_id": 5,
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
				"production_plan_id": 6,
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
				"production_plan_id": 7,
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
