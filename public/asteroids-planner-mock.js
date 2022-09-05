
const mockAsteroidsPlannerTree = [
	{
		"asteroid_name": "Asteroid #1234",
		"asteroid_type": "M",
		"asteroid_area": 75,
		"planned_products": [
			{
				"planned_product_name": "Aluminium",
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
		"asteroid_name": "Asteroid #5678",
		"asteroid_type": "CIS",
		"asteroid_area": 50,
		"planned_products": [
			{
				"planned_product_name": "Carbon Monoxide",
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
