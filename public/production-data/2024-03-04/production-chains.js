/**
 * Source: Influenceth SDK export @ 2024-03-04
 * 
 * WARNING: Product IDs for ships and buildings are NOT numeric - e.g. "S1", "S2", ..., "B1", "B2", ...
 * 
 * mAdalianHoursPerSR = M (Adalian Hours per SR)
 * bAdalianHoursPerAction = B (Adalian Hours per Action), i.e. startup time
 * 
 * processTime = M * number_of_SRs + B
 * 
 * process outputs: 100% for the primary output, 50% for the secondary outputs
 * 
 * if product "quantized" FALSE => units = "kg" (a.k.a. units / 1000 = "tonnes")
 */
const InfluenceProductionChainsJSON = {
	"_hash": {
		"buildings": 28324361,
		"processes": 594412439,
		"products": 61622159,
		"spectralTypes": 1073020339
	},
	"buildings": [
		{
			"id": "0",
			"name": "Empty Lot"
		},
		{
			"id": "1",
			"name": "Warehouse"
		},
		{
			"id": "2",
			"name": "Extractor"
		},
		{
			"id": "3",
			"name": "Refinery"
		},
		{
			"id": "4",
			"name": "Bioreactor"
		},
		{
			"id": "5",
			"name": "Factory"
		},
		{
			"id": "6",
			"name": "Shipyard"
		},
		{
			"id": "7",
			"name": "Spaceport"
		},
		{
			"id": "8",
			"name": "Marketplace"
		},
		{
			"id": "9",
			"name": "Habitat"
		}
	],
	"processes": [
		{
			"bAdalianHoursPerAction": "N/A",
			"buildingId": "2",
			"id": "1",
			"inputs": [],
			"mAdalianHoursPerSR": "N/A",
			"name": "Water Mining",
			"outputs": [
				{
					"productId": "1",
					"unitsPerSR": ""
				}
			]
		},
		{
			"bAdalianHoursPerAction": "N/A",
			"buildingId": "2",
			"id": "2",
			"inputs": [],
			"mAdalianHoursPerSR": "N/A",
			"name": "Hydrogen Mining",
			"outputs": [
				{
					"productId": "2",
					"unitsPerSR": ""
				}
			]
		},
		{
			"bAdalianHoursPerAction": "N/A",
			"buildingId": "2",
			"id": "3",
			"inputs": [],
			"mAdalianHoursPerSR": "N/A",
			"name": "Ammonia Mining",
			"outputs": [
				{
					"productId": "3",
					"unitsPerSR": ""
				}
			]
		},
		{
			"bAdalianHoursPerAction": "N/A",
			"buildingId": "2",
			"id": "4",
			"inputs": [],
			"mAdalianHoursPerSR": "N/A",
			"name": "Nitrogen Mining",
			"outputs": [
				{
					"productId": "4",
					"unitsPerSR": ""
				}
			]
		},
		{
			"bAdalianHoursPerAction": "N/A",
			"buildingId": "2",
			"id": "5",
			"inputs": [],
			"mAdalianHoursPerSR": "N/A",
			"name": "Sulfur Dioxide Mining",
			"outputs": [
				{
					"productId": "5",
					"unitsPerSR": ""
				}
			]
		},
		{
			"bAdalianHoursPerAction": "N/A",
			"buildingId": "2",
			"id": "6",
			"inputs": [],
			"mAdalianHoursPerSR": "N/A",
			"name": "Carbon Dioxide Mining",
			"outputs": [
				{
					"productId": "6",
					"unitsPerSR": ""
				}
			]
		},
		{
			"bAdalianHoursPerAction": "N/A",
			"buildingId": "2",
			"id": "7",
			"inputs": [],
			"mAdalianHoursPerSR": "N/A",
			"name": "Carbon Monoxide Mining",
			"outputs": [
				{
					"productId": "7",
					"unitsPerSR": ""
				}
			]
		},
		{
			"bAdalianHoursPerAction": "N/A",
			"buildingId": "2",
			"id": "8",
			"inputs": [],
			"mAdalianHoursPerSR": "N/A",
			"name": "Methane Mining",
			"outputs": [
				{
					"productId": "8",
					"unitsPerSR": ""
				}
			]
		},
		{
			"bAdalianHoursPerAction": "N/A",
			"buildingId": "2",
			"id": "9",
			"inputs": [],
			"mAdalianHoursPerSR": "N/A",
			"name": "Apatite Mining",
			"outputs": [
				{
					"productId": "9",
					"unitsPerSR": ""
				}
			]
		},
		{
			"bAdalianHoursPerAction": "N/A",
			"buildingId": "2",
			"id": "10",
			"inputs": [],
			"mAdalianHoursPerSR": "N/A",
			"name": "Bitumen Mining",
			"outputs": [
				{
					"productId": "10",
					"unitsPerSR": ""
				}
			]
		},
		{
			"bAdalianHoursPerAction": "N/A",
			"buildingId": "2",
			"id": "11",
			"inputs": [],
			"mAdalianHoursPerSR": "N/A",
			"name": "Calcite Mining",
			"outputs": [
				{
					"productId": "11",
					"unitsPerSR": ""
				}
			]
		},
		{
			"bAdalianHoursPerAction": "N/A",
			"buildingId": "2",
			"id": "12",
			"inputs": [],
			"mAdalianHoursPerSR": "N/A",
			"name": "Feldspar Mining",
			"outputs": [
				{
					"productId": "12",
					"unitsPerSR": ""
				}
			]
		},
		{
			"bAdalianHoursPerAction": "N/A",
			"buildingId": "2",
			"id": "13",
			"inputs": [],
			"mAdalianHoursPerSR": "N/A",
			"name": "Olivine Mining",
			"outputs": [
				{
					"productId": "13",
					"unitsPerSR": ""
				}
			]
		},
		{
			"bAdalianHoursPerAction": "N/A",
			"buildingId": "2",
			"id": "14",
			"inputs": [],
			"mAdalianHoursPerSR": "N/A",
			"name": "Pyroxene Mining",
			"outputs": [
				{
					"productId": "14",
					"unitsPerSR": ""
				}
			]
		},
		{
			"bAdalianHoursPerAction": "N/A",
			"buildingId": "2",
			"id": "15",
			"inputs": [],
			"mAdalianHoursPerSR": "N/A",
			"name": "Coffinite Mining",
			"outputs": [
				{
					"productId": "15",
					"unitsPerSR": ""
				}
			]
		},
		{
			"bAdalianHoursPerAction": "N/A",
			"buildingId": "2",
			"id": "16",
			"inputs": [],
			"mAdalianHoursPerSR": "N/A",
			"name": "Merrillite Mining",
			"outputs": [
				{
					"productId": "16",
					"unitsPerSR": ""
				}
			]
		},
		{
			"bAdalianHoursPerAction": "N/A",
			"buildingId": "2",
			"id": "17",
			"inputs": [],
			"mAdalianHoursPerSR": "N/A",
			"name": "Xenotime Mining",
			"outputs": [
				{
					"productId": "17",
					"unitsPerSR": ""
				}
			]
		},
		{
			"bAdalianHoursPerAction": "N/A",
			"buildingId": "2",
			"id": "18",
			"inputs": [],
			"mAdalianHoursPerSR": "N/A",
			"name": "Rhabdite Mining",
			"outputs": [
				{
					"productId": "18",
					"unitsPerSR": ""
				}
			]
		},
		{
			"bAdalianHoursPerAction": "N/A",
			"buildingId": "2",
			"id": "19",
			"inputs": [],
			"mAdalianHoursPerSR": "N/A",
			"name": "Graphite Mining",
			"outputs": [
				{
					"productId": "19",
					"unitsPerSR": ""
				}
			]
		},
		{
			"bAdalianHoursPerAction": "N/A",
			"buildingId": "2",
			"id": "20",
			"inputs": [],
			"mAdalianHoursPerSR": "N/A",
			"name": "Taenite Mining",
			"outputs": [
				{
					"productId": "20",
					"unitsPerSR": ""
				}
			]
		},
		{
			"bAdalianHoursPerAction": "N/A",
			"buildingId": "2",
			"id": "21",
			"inputs": [],
			"mAdalianHoursPerSR": "N/A",
			"name": "Troilite Mining",
			"outputs": [
				{
					"productId": "21",
					"unitsPerSR": ""
				}
			]
		},
		{
			"bAdalianHoursPerAction": "N/A",
			"buildingId": "2",
			"id": "22",
			"inputs": [],
			"mAdalianHoursPerSR": "N/A",
			"name": "Uraninite Mining",
			"outputs": [
				{
					"productId": "22",
					"unitsPerSR": ""
				}
			]
		},
		{
			"bAdalianHoursPerAction": "2",
			"buildingId": "3",
			"id": "23",
			"inputs": [
				{
					"productId": "24",
					"unitsPerSR": "9"
				}
			],
			"mAdalianHoursPerSR": "0.0378",
			"name": "Water Electrolysis",
			"outputs": [
				{
					"productId": "2",
					"unitsPerSR": "1"
				},
				{
					"productId": "23",
					"unitsPerSR": "8"
				}
			]
		},
		{
			"bAdalianHoursPerAction": "16",
			"buildingId": "3",
			"id": "24",
			"inputs": [
				{
					"productId": "1",
					"unitsPerSR": "20"
				}
			],
			"mAdalianHoursPerSR": "0.00126",
			"name": "Water Vacuum-evaporation Desalination",
			"outputs": [
				{
					"productId": "24",
					"unitsPerSR": "19"
				},
				{
					"productId": "25",
					"unitsPerSR": "1"
				}
			]
		},
		{
			"bAdalianHoursPerAction": "24",
			"buildingId": "3",
			"id": "25",
			"inputs": [
				{
					"productId": "2",
					"unitsPerSR": "8"
				},
				{
					"productId": "6",
					"unitsPerSR": "44"
				}
			],
			"mAdalianHoursPerSR": "0.00104",
			"name": "Sabatier Process",
			"outputs": [
				{
					"productId": "8",
					"unitsPerSR": "16"
				},
				{
					"productId": "24",
					"unitsPerSR": "36"
				}
			]
		},
		{
			"bAdalianHoursPerAction": "336",
			"buildingId": "3",
			"id": "26",
			"inputs": [
				{
					"productId": "6",
					"unitsPerSR": "1936"
				},
				{
					"productId": "13",
					"unitsPerSR": "4526"
				}
			],
			"mAdalianHoursPerSR": "0.129",
			"name": "Olivine Enhanced Weathering",
			"outputs": [
				{
					"productId": "26",
					"unitsPerSR": "1322"
				},
				{
					"productId": "58",
					"unitsPerSR": "5140"
				}
			]
		},
		{
			"bAdalianHoursPerAction": "12",
			"buildingId": "3",
			"id": "27",
			"inputs": [
				{
					"productId": "2",
					"unitsPerSR": "7"
				},
				{
					"productId": "10",
					"unitsPerSR": "200"
				}
			],
			"mAdalianHoursPerSR": "0.0104",
			"name": "Bitumen Hydro-cracking",
			"outputs": [
				{
					"productId": "27",
					"unitsPerSR": "60"
				}
			]
		},
		{
			"bAdalianHoursPerAction": "24",
			"buildingId": "3",
			"id": "28",
			"inputs": [
				{
					"productId": "20",
					"unitsPerSR": "20"
				}
			],
			"mAdalianHoursPerSR": "0.0075",
			"name": "Taenite Electrolytic Refining",
			"outputs": [
				{
					"productId": "29",
					"unitsPerSR": "15"
				},
				{
					"productId": "30",
					"unitsPerSR": "1"
				},
				{
					"productId": "31",
					"unitsPerSR": "3"
				}
			]
		},
		{
			"bAdalianHoursPerAction": "2",
			"buildingId": "3",
			"id": "29",
			"inputs": [
				{
					"productId": "11",
					"unitsPerSR": "100"
				}
			],
			"mAdalianHoursPerSR": "0.002",
			"name": "Calcite Calcination",
			"outputs": [
				{
					"productId": "6",
					"unitsPerSR": "44"
				},
				{
					"productId": "32",
					"unitsPerSR": "56"
				}
			]
		},
		{
			"bAdalianHoursPerAction": "8",
			"buildingId": "3",
			"id": "30",
			"inputs": [
				{
					"productId": "8",
					"unitsPerSR": "16"
				}
			],
			"mAdalianHoursPerSR": "0.0304",
			"name": "Huels Process",
			"outputs": [
				{
					"productId": "33",
					"unitsPerSR": "13"
				}
			]
		},
		{
			"bAdalianHoursPerAction": "4",
			"buildingId": "3",
			"id": "31",
			"inputs": [
				{
					"productId": "3",
					"unitsPerSR": "34"
				},
				{
					"productId": "6",
					"unitsPerSR": "44"
				},
				{
					"productId": "24",
					"unitsPerSR": "18"
				}
			],
			"mAdalianHoursPerSR": "0.0048",
			"name": "Ammonia Carbonation",
			"outputs": [
				{
					"productId": "34",
					"unitsPerSR": "96"
				}
			]
		},
		{
			"bAdalianHoursPerAction": "2",
			"buildingId": "3",
			"id": "32",
			"inputs": [
				{
					"productId": "25",
					"unitsPerSR": "8"
				},
				{
					"productId": "29",
					"unitsPerSR": "2"
				},
				{
					"productId": "55",
					"unitsPerSR": "6"
				},
				{
					"productId": "83",
					"unitsPerSR": "4"
				}
			],
			"mAdalianHoursPerSR": "0.00004",
			"name": "Salt Sulfidization and Phosphorization",
			"outputs": [
				{
					"productId": "36",
					"unitsPerSR": "17"
				}
			]
		},
		{
			"bAdalianHoursPerAction": "40",
			"buildingId": "5",
			"id": "33",
			"inputs": [
				{
					"productId": "64",
					"unitsPerSR": "3"
				},
				{
					"productId": "91",
					"unitsPerSR": "4"
				},
				{
					"productId": "92",
					"unitsPerSR": "4"
				},
				{
					"productId": "103",
					"unitsPerSR": "1"
				}
			],
			"mAdalianHoursPerSR": "0.0006",
			"name": "Basic Food Cooking and Packaging",
			"outputs": [
				{
					"productId": "129",
					"unitsPerSR": "12"
				}
			]
		},
		{
			"bAdalianHoursPerAction": "12",
			"buildingId": "3",
			"id": "34",
			"inputs": [
				{
					"productId": "21",
					"unitsPerSR": "100"
				},
				{
					"productId": "55",
					"unitsPerSR": "1"
				}
			],
			"mAdalianHoursPerSR": "0.00404",
			"name": "Troilite Centrifugal Froth Flotation",
			"outputs": [
				{
					"productId": "37",
					"unitsPerSR": "80"
				},
				{
					"productId": "38",
					"unitsPerSR": "8"
				},
				{
					"productId": "39",
					"unitsPerSR": "7"
				},
				{
					"productId": "40",
					"unitsPerSR": "5"
				}
			]
		},
		{
			"bAdalianHoursPerAction": "12",
			"buildingId": "5",
			"id": "35",
			"inputs": [
				{
					"productId": "26",
					"unitsPerSR": "1"
				}
			],
			"mAdalianHoursPerSR": "0.0001330555556",
			"name": "Silica Fusing",
			"outputs": [
				{
					"productId": "41",
					"unitsPerSR": "1"
				}
			]
		},
		{
			"bAdalianHoursPerAction": "30",
			"buildingId": "5",
			"id": "36",
			"inputs": [
				{
					"productId": "26",
					"unitsPerSR": "1"
				}
			],
			"mAdalianHoursPerSR": "0.000125",
			"name": "Silica Pultrusion",
			"outputs": [
				{
					"productId": "42",
					"unitsPerSR": "1"
				}
			]
		},
		{
			"bAdalianHoursPerAction": "24",
			"buildingId": "5",
			"id": "37",
			"inputs": [
				{
					"productId": "30",
					"unitsPerSR": "1"
				}
			],
			"mAdalianHoursPerSR": "0.0000625",
			"name": "Copper Wire Drawing",
			"outputs": [
				{
					"productId": "43",
					"unitsPerSR": "1"
				}
			]
		},
		{
			"bAdalianHoursPerAction": "6",
			"buildingId": "5",
			"id": "38",
			"inputs": [
				{
					"productId": "1",
					"unitsPerSR": "5"
				},
				{
					"productId": "32",
					"unitsPerSR": "3"
				}
			],
			"mAdalianHoursPerSR": "0.0000825",
			"name": "Salty Cement Mixing",
			"outputs": [
				{
					"productId": "44",
					"unitsPerSR": "7"
				}
			]
		},
		{
			"bAdalianHoursPerAction": "72",
			"buildingId": "3",
			"id": "39",
			"inputs": [
				{
					"productId": "25",
					"unitsPerSR": "100"
				}
			],
			"mAdalianHoursPerSR": "0.00333",
			"name": "Salt Selective Crystallization",
			"outputs": [
				{
					"productId": "45",
					"unitsPerSR": "46"
				},
				{
					"productId": "46",
					"unitsPerSR": "29"
				},
				{
					"productId": "47",
					"unitsPerSR": "2"
				},
				{
					"productId": "48",
					"unitsPerSR": "13"
				},
				{
					"productId": "49",
					"unitsPerSR": "6"
				},
				{
					"productId": "78",
					"unitsPerSR": "5"
				}
			]
		},
		{
			"bAdalianHoursPerAction": "10",
			"buildingId": "3",
			"id": "40",
			"inputs": [
				{
					"productId": "24",
					"unitsPerSR": "4"
				},
				{
					"productId": "27",
					"unitsPerSR": "16"
				}
			],
			"mAdalianHoursPerSR": "0.0002",
			"name": "Naphtha Steam-cracking",
			"outputs": [
				{
					"productId": "50",
					"unitsPerSR": "3"
				}
			]
		},
		{
			"bAdalianHoursPerAction": "24",
			"buildingId": "3",
			"id": "41",
			"inputs": [
				{
					"productId": "19",
					"unitsPerSR": "5"
				},
				{
					"productId": "29",
					"unitsPerSR": "994"
				},
				{
					"productId": "112",
					"unitsPerSR": "1"
				}
			],
			"mAdalianHoursPerSR": "0.045",
			"name": "Steel Alloying",
			"outputs": [
				{
					"productId": "52",
					"unitsPerSR": "1000"
				}
			]
		},
		{
			"bAdalianHoursPerAction": "12",
			"buildingId": "3",
			"id": "42",
			"inputs": [
				{
					"productId": "19",
					"unitsPerSR": "24"
				},
				{
					"productId": "26",
					"unitsPerSR": "60"
				}
			],
			"mAdalianHoursPerSR": "0.0308",
			"name": "Silica Carbothermic Reduction",
			"outputs": [
				{
					"productId": "7",
					"unitsPerSR": "56"
				},
				{
					"productId": "53",
					"unitsPerSR": "28"
				}
			]
		},
		{
			"bAdalianHoursPerAction": "15",
			"buildingId": "3",
			"id": "43",
			"inputs": [
				{
					"productId": "3",
					"unitsPerSR": "17"
				},
				{
					"productId": "23",
					"unitsPerSR": "64"
				},
				{
					"productId": "24",
					"unitsPerSR": "24"
				}
			],
			"mAdalianHoursPerSR": "0.003",
			"name": "Ostwald Process",
			"outputs": [
				{
					"productId": "54",
					"unitsPerSR": "87"
				}
			]
		},
		{
			"bAdalianHoursPerAction": "8",
			"buildingId": "3",
			"id": "44",
			"inputs": [
				{
					"productId": "5",
					"unitsPerSR": "64"
				},
				{
					"productId": "23",
					"unitsPerSR": "16"
				},
				{
					"productId": "24",
					"unitsPerSR": "18"
				}
			],
			"mAdalianHoursPerSR": "0.002",
			"name": "Wet Sulfuric Acid Process",
			"outputs": [
				{
					"productId": "55",
					"unitsPerSR": "98"
				}
			]
		},
		{
			"bAdalianHoursPerAction": "30",
			"buildingId": "4",
			"id": "45",
			"inputs": [
				{
					"productId": "10",
					"unitsPerSR": "300000"
				},
				{
					"productId": "24",
					"unitsPerSR": "200000"
				}
			],
			"mAdalianHoursPerSR": "2880",
			"name": "Fungal Soilbuilding",
			"outputs": [
				{
					"productId": "56",
					"unitsPerSR": "500000"
				}
			]
		},
		{
			"bAdalianHoursPerAction": "20",
			"buildingId": "3",
			"id": "46",
			"inputs": [
				{
					"productId": "19",
					"unitsPerSR": "123"
				},
				{
					"productId": "26",
					"unitsPerSR": "320"
				},
				{
					"productId": "63",
					"unitsPerSR": "232"
				}
			],
			"mAdalianHoursPerSR": "0.223",
			"name": "Iron Oxide and Silica Carbothermic Reduction",
			"outputs": [
				{
					"productId": "6",
					"unitsPerSR": "451"
				},
				{
					"productId": "57",
					"unitsPerSR": "224"
				}
			]
		},
		{
			"bAdalianHoursPerAction": "24",
			"buildingId": "3",
			"id": "47",
			"inputs": [
				{
					"productId": "8",
					"unitsPerSR": "16"
				},
				{
					"productId": "24",
					"unitsPerSR": "18"
				}
			],
			"mAdalianHoursPerSR": "0.00204",
			"name": "Methane Steam Reforming and Water-gas Shift",
			"outputs": [
				{
					"productId": "2",
					"unitsPerSR": "6"
				},
				{
					"productId": "7",
					"unitsPerSR": "28"
				}
			]
		},
		{
			"bAdalianHoursPerAction": "16",
			"buildingId": "3",
			"id": "48",
			"inputs": [
				{
					"productId": "33",
					"unitsPerSR": "39"
				},
				{
					"productId": "54",
					"unitsPerSR": "126"
				}
			],
			"mAdalianHoursPerSR": "0.00825",
			"name": "Acetylene Oxalic Acid Production",
			"outputs": [
				{
					"productId": "59",
					"unitsPerSR": "135"
				}
			]
		},
		{
			"bAdalianHoursPerAction": "18",
			"buildingId": "3",
			"id": "49",
			"inputs": [
				{
					"productId": "7",
					"unitsPerSR": "1344"
				},
				{
					"productId": "23",
					"unitsPerSR": "2304"
				},
				{
					"productId": "38",
					"unitsPerSR": "11485"
				}
			],
			"mAdalianHoursPerSR": "0.34",
			"name": "Lead Sulfide Smelting",
			"outputs": [
				{
					"productId": "5",
					"unitsPerSR": "3072"
				},
				{
					"productId": "6",
					"unitsPerSR": "2112"
				},
				{
					"productId": "194",
					"unitsPerSR": "10049"
				}
			]
		},
		{
			"bAdalianHoursPerAction": "22",
			"buildingId": "3",
			"id": "50",
			"inputs": [
				{
					"productId": "7",
					"unitsPerSR": "56"
				},
				{
					"productId": "11",
					"unitsPerSR": "6"
				},
				{
					"productId": "23",
					"unitsPerSR": "108"
				},
				{
					"productId": "39",
					"unitsPerSR": "270"
				}
			],
			"mAdalianHoursPerSR": "0.0165",
			"name": "Tin Sulfide Smelting",
			"outputs": [
				{
					"productId": "5",
					"unitsPerSR": "128"
				},
				{
					"productId": "6",
					"unitsPerSR": "88"
				},
				{
					"productId": "62",
					"unitsPerSR": "238"
				}
			]
		},
		{
			"bAdalianHoursPerAction": "20",
			"buildingId": "3",
			"id": "51",
			"inputs": [
				{
					"productId": "23",
					"unitsPerSR": "160"
				},
				{
					"productId": "37",
					"unitsPerSR": "264"
				}
			],
			"mAdalianHoursPerSR": "0.0106",
			"name": "Iron Sulfide Roasting",
			"outputs": [
				{
					"productId": "5",
					"unitsPerSR": "192"
				},
				{
					"productId": "63",
					"unitsPerSR": "232"
				}
			]
		},
		{
			"bAdalianHoursPerAction": "14",
			"buildingId": "3",
			"id": "52",
			"inputs": [
				{
					"productId": "2",
					"unitsPerSR": "6"
				},
				{
					"productId": "180",
					"unitsPerSR": "28"
				}
			],
			"mAdalianHoursPerSR": "0.0218",
			"name": "Haber-Bosch Process",
			"outputs": [
				{
					"productId": "3",
					"unitsPerSR": "34"
				}
			]
		},
		{
			"bAdalianHoursPerAction": "24",
			"buildingId": "3",
			"id": "53",
			"inputs": [
				{
					"productId": "23",
					"unitsPerSR": "224"
				},
				{
					"productId": "40",
					"unitsPerSR": "320"
				}
			],
			"mAdalianHoursPerSR": "0.0163",
			"name": "Molybdenum Disulfide Roasting",
			"outputs": [
				{
					"productId": "5",
					"unitsPerSR": "256"
				},
				{
					"productId": "65",
					"unitsPerSR": "288"
				}
			]
		},
		{
			"bAdalianHoursPerAction": "8",
			"buildingId": "5",
			"id": "54",
			"inputs": [
				{
					"productId": "26",
					"unitsPerSR": "1"
				}
			],
			"mAdalianHoursPerSR": "0.00008",
			"name": "Silica Gas Atomization",
			"outputs": [
				{
					"productId": "66",
					"unitsPerSR": "1"
				}
			]
		},
		{
			"bAdalianHoursPerAction": "20",
			"buildingId": "5",
			"id": "55",
			"inputs": [
				{
					"productId": "30",
					"unitsPerSR": "1"
				},
				{
					"productId": "60",
					"unitsPerSR": "6"
				},
				{
					"productId": "62",
					"unitsPerSR": "143"
				}
			],
			"mAdalianHoursPerSR": "0.03",
			"name": "Solder Manufacturing",
			"outputs": [
				{
					"productId": "67",
					"unitsPerSR": "150"
				}
			]
		},
		{
			"bAdalianHoursPerAction": "40",
			"buildingId": "5",
			"id": "56",
			"inputs": [
				{
					"productId": "41",
					"unitsPerSR": "1"
				},
				{
					"productId": "74",
					"unitsPerSR": "4"
				}
			],
			"mAdalianHoursPerSR": "0.1",
			"name": "Quartz Filament Drawing and Wrapping",
			"outputs": [
				{
					"productId": "68",
					"unitsPerSR": "5"
				}
			]
		},
		{
			"bAdalianHoursPerAction": "25",
			"buildingId": "5",
			"id": "57",
			"inputs": [
				{
					"productId": "52",
					"unitsPerSR": "1"
				}
			],
			"mAdalianHoursPerSR": "0.00002305555556",
			"name": "Steel Beam Rolling",
			"outputs": [
				{
					"productId": "69",
					"unitsPerSR": "1"
				}
			]
		},
		{
			"bAdalianHoursPerAction": "22",
			"buildingId": "5",
			"id": "58",
			"inputs": [
				{
					"productId": "52",
					"unitsPerSR": "1"
				}
			],
			"mAdalianHoursPerSR": "0.000025",
			"name": "Steel Sheet Rolling",
			"outputs": [
				{
					"productId": "70",
					"unitsPerSR": "1"
				}
			]
		},
		{
			"bAdalianHoursPerAction": "27",
			"buildingId": "5",
			"id": "59",
			"inputs": [
				{
					"productId": "52",
					"unitsPerSR": "1"
				}
			],
			"mAdalianHoursPerSR": "0.00002861111111",
			"name": "Steel Pipe Rolling",
			"outputs": [
				{
					"productId": "71",
					"unitsPerSR": "1"
				}
			]
		},
		{
			"bAdalianHoursPerAction": "24",
			"buildingId": "5",
			"id": "60",
			"inputs": [
				{
					"productId": "52",
					"unitsPerSR": "1"
				}
			],
			"mAdalianHoursPerSR": "0.0001",
			"name": "Steel Wire Drawing",
			"outputs": [
				{
					"productId": "72",
					"unitsPerSR": "1"
				}
			]
		},
		{
			"bAdalianHoursPerAction": "28",
			"buildingId": "3",
			"id": "61",
			"inputs": [
				{
					"productId": "3",
					"unitsPerSR": "374"
				},
				{
					"productId": "23",
					"unitsPerSR": "960"
				},
				{
					"productId": "50",
					"unitsPerSR": "841"
				},
				{
					"productId": "55",
					"unitsPerSR": "98"
				}
			],
			"mAdalianHoursPerSR": "0.0909",
			"name": "Propylene Ammoxidation",
			"outputs": [
				{
					"productId": "24",
					"unitsPerSR": "1080"
				},
				{
					"productId": "73",
					"unitsPerSR": "796"
				}
			]
		},
		{
			"bAdalianHoursPerAction": "30",
			"buildingId": "3",
			"id": "62",
			"inputs": [
				{
					"productId": "50",
					"unitsPerSR": "1"
				}
			],
			"mAdalianHoursPerSR": "0.00002",
			"name": "Propylene Polymerization",
			"outputs": [
				{
					"productId": "74",
					"unitsPerSR": "1"
				}
			]
		},
		{
			"bAdalianHoursPerAction": "48",
			"buildingId": "3",
			"id": "63",
			"inputs": [
				{
					"productId": "49",
					"unitsPerSR": "95"
				}
			],
			"mAdalianHoursPerSR": "0.105",
			"name": "Magnesium Chloride Molten Salt Electrolysis",
			"outputs": [
				{
					"productId": "75",
					"unitsPerSR": "24"
				},
				{
					"productId": "76",
					"unitsPerSR": "71"
				}
			]
		},
		{
			"bAdalianHoursPerAction": "24",
			"buildingId": "3",
			"id": "64",
			"inputs": [
				{
					"productId": "11",
					"unitsPerSR": "100"
				},
				{
					"productId": "45",
					"unitsPerSR": "117"
				}
			],
			"mAdalianHoursPerSR": "0.0673",
			"name": "Solvay Process",
			"outputs": [
				{
					"productId": "77",
					"unitsPerSR": "106"
				},
				{
					"productId": "78",
					"unitsPerSR": "111"
				}
			]
		},
		{
			"bAdalianHoursPerAction": "10",
			"buildingId": "3",
			"id": "65",
			"inputs": [
				{
					"productId": "24",
					"unitsPerSR": "54"
				},
				{
					"productId": "79",
					"unitsPerSR": "70"
				}
			],
			"mAdalianHoursPerSR": "0.0124",
			"name": "Boron Trioxide Hydration",
			"outputs": [
				{
					"productId": "84",
					"unitsPerSR": "124"
				}
			]
		},
		{
			"bAdalianHoursPerAction": "60",
			"buildingId": "3",
			"id": "66",
			"inputs": [
				{
					"productId": "14",
					"unitsPerSR": "2200"
				},
				{
					"productId": "55",
					"unitsPerSR": "294"
				},
				{
					"productId": "89",
					"unitsPerSR": "40"
				}
			],
			"mAdalianHoursPerSR": "0.0507",
			"name": "Pyroxene Acid Leaching, Digestion, and Ion Exchange",
			"outputs": [
				{
					"productId": "80",
					"unitsPerSR": "294"
				},
				{
					"productId": "117",
					"unitsPerSR": "110"
				}
			]
		},
		{
			"bAdalianHoursPerAction": "58",
			"buildingId": "3",
			"id": "67",
			"inputs": [
				{
					"productId": "9",
					"unitsPerSR": "2051"
				},
				{
					"productId": "55",
					"unitsPerSR": "1960"
				}
			],
			"mAdalianHoursPerSR": "0.0669",
			"name": "Apatite Acid Extraction",
			"outputs": [
				{
					"productId": "81",
					"unitsPerSR": "73"
				},
				{
					"productId": "82",
					"unitsPerSR": "40"
				},
				{
					"productId": "83",
					"unitsPerSR": "1176"
				}
			]
		},
		{
			"bAdalianHoursPerAction": "6",
			"buildingId": "3",
			"id": "68",
			"inputs": [
				{
					"productId": "2",
					"unitsPerSR": "2"
				},
				{
					"productId": "23",
					"unitsPerSR": "16"
				}
			],
			"mAdalianHoursPerSR": "0.00009",
			"name": "Hydrogen Combustion",
			"outputs": [
				{
					"productId": "24",
					"unitsPerSR": "18"
				}
			]
		},
		{
			"bAdalianHoursPerAction": "8",
			"buildingId": "3",
			"id": "69",
			"inputs": [
				{
					"productId": "7",
					"unitsPerSR": "56"
				},
				{
					"productId": "23",
					"unitsPerSR": "32"
				}
			],
			"mAdalianHoursPerSR": "0.0005872222222",
			"name": "Carbon Monoxide Combustion",
			"outputs": [
				{
					"productId": "6",
					"unitsPerSR": "88"
				}
			]
		},
		{
			"bAdalianHoursPerAction": "48",
			"buildingId": "3",
			"id": "70",
			"inputs": [
				{
					"productId": "24",
					"unitsPerSR": "90"
				},
				{
					"productId": "47",
					"unitsPerSR": "201"
				},
				{
					"productId": "81",
					"unitsPerSR": "73"
				}
			],
			"mAdalianHoursPerSR": "0.00607",
			"name": "Borax Acid Extraction",
			"outputs": [
				{
					"productId": "45",
					"unitsPerSR": "117"
				},
				{
					"productId": "84",
					"unitsPerSR": "247"
				}
			]
		},
		{
			"bAdalianHoursPerAction": "5",
			"buildingId": "3",
			"id": "71",
			"inputs": [
				{
					"productId": "4",
					"unitsPerSR": "1000"
				},
				{
					"productId": "112",
					"unitsPerSR": "2"
				}
			],
			"mAdalianHoursPerSR": "0.0601",
			"name": "Nitrogen Cryocooling and Fractional Distillation",
			"outputs": [
				{
					"productId": "180",
					"unitsPerSR": "950"
				},
				{
					"productId": "220",
					"unitsPerSR": "5"
				}
			]
		},
		{
			"bAdalianHoursPerAction": "64",
			"buildingId": "3",
			"id": "72",
			"inputs": [
				{
					"productId": "55",
					"unitsPerSR": "12946"
				},
				{
					"productId": "58",
					"unitsPerSR": "15422"
				}
			],
			"mAdalianHoursPerSR": "0.567",
			"name": "Olivine Acid Leaching and Calcining",
			"outputs": [
				{
					"productId": "5",
					"unitsPerSR": "8456"
				},
				{
					"productId": "6",
					"unitsPerSR": "5809"
				},
				{
					"productId": "23",
					"unitsPerSR": "1984"
				},
				{
					"productId": "24",
					"unitsPerSR": "2378"
				},
				{
					"productId": "63",
					"unitsPerSR": "1852"
				},
				{
					"productId": "85",
					"unitsPerSR": "488"
				},
				{
					"productId": "86",
					"unitsPerSR": "448"
				},
				{
					"productId": "87",
					"unitsPerSR": "3869"
				}
			]
		},
		{
			"bAdalianHoursPerAction": "84",
			"buildingId": "3",
			"id": "73",
			"inputs": [
				{
					"productId": "12",
					"unitsPerSR": "1096"
				},
				{
					"productId": "34",
					"unitsPerSR": "96"
				},
				{
					"productId": "55",
					"unitsPerSR": "392"
				},
				{
					"productId": "82",
					"unitsPerSR": "160"
				}
			],
			"mAdalianHoursPerSR": "0.03488",
			"name": "Anorthite Feldspar Acid Leaching and Carbonation",
			"outputs": [
				{
					"productId": "24",
					"unitsPerSR": "144"
				},
				{
					"productId": "189",
					"unitsPerSR": "624"
				},
				{
					"productId": "217",
					"unitsPerSR": "69"
				}
			]
		},
		{
			"bAdalianHoursPerAction": "20",
			"buildingId": "3",
			"id": "74",
			"inputs": [
				{
					"productId": "24",
					"unitsPerSR": "36"
				},
				{
					"productId": "45",
					"unitsPerSR": "117"
				}
			],
			"mAdalianHoursPerSR": "0.018",
			"name": "Sodium Chloralkalai Process",
			"outputs": [
				{
					"productId": "2",
					"unitsPerSR": "2"
				},
				{
					"productId": "76",
					"unitsPerSR": "71"
				},
				{
					"productId": "89",
					"unitsPerSR": "80"
				}
			]
		},
		{
			"bAdalianHoursPerAction": "20",
			"buildingId": "3",
			"id": "75",
			"inputs": [
				{
					"productId": "24",
					"unitsPerSR": "36"
				},
				{
					"productId": "46",
					"unitsPerSR": "149"
				}
			],
			"mAdalianHoursPerSR": "0.0252",
			"name": "Potassium Chloralkalai Process",
			"outputs": [
				{
					"productId": "2",
					"unitsPerSR": "2"
				},
				{
					"productId": "76",
					"unitsPerSR": "71"
				},
				{
					"productId": "90",
					"unitsPerSR": "112"
				}
			]
		},
		{
			"bAdalianHoursPerAction": "52",
			"buildingId": "3",
			"id": "76",
			"inputs": [
				{
					"productId": "9",
					"unitsPerSR": "2051"
				},
				{
					"productId": "83",
					"unitsPerSR": "2743"
				}
			],
			"mAdalianHoursPerSR": "0.0639",
			"name": "Apatite Acid Re-extraction",
			"outputs": [
				{
					"productId": "35",
					"unitsPerSR": "4681"
				},
				{
					"productId": "81",
					"unitsPerSR": "73"
				},
				{
					"productId": "82",
					"unitsPerSR": "40"
				}
			]
		},
		{
			"bAdalianHoursPerAction": "8",
			"buildingId": "3",
			"id": "77",
			"inputs": [
				{
					"productId": "34",
					"unitsPerSR": "96"
				},
				{
					"productId": "59",
					"unitsPerSR": "90"
				}
			],
			"mAdalianHoursPerSR": "0.0124",
			"name": "Ammonium Carbonate Oxalation",
			"outputs": [
				{
					"productId": "6",
					"unitsPerSR": "44"
				},
				{
					"productId": "24",
					"unitsPerSR": "18"
				},
				{
					"productId": "93",
					"unitsPerSR": "124"
				}
			]
		},
		{
			"bAdalianHoursPerAction": "26",
			"buildingId": "3",
			"id": "78",
			"inputs": [
				{
					"productId": "17",
					"unitsPerSR": "1614"
				},
				{
					"productId": "55",
					"unitsPerSR": "1176"
				}
			],
			"mAdalianHoursPerSR": "0.124",
			"name": "Xenotime Hot Acid Leaching",
			"outputs": [
				{
					"productId": "83",
					"unitsPerSR": "784"
				},
				{
					"productId": "94",
					"unitsPerSR": "2006"
				}
			]
		},
		{
			"bAdalianHoursPerAction": "28",
			"buildingId": "3",
			"id": "79",
			"inputs": [
				{
					"productId": "16",
					"unitsPerSR": "4623"
				},
				{
					"productId": "55",
					"unitsPerSR": "1176"
				},
				{
					"productId": "81",
					"unitsPerSR": "2625"
				}
			],
			"mAdalianHoursPerSR": "0.465",
			"name": "Merrillite Hot Acid Leaching",
			"outputs": [
				{
					"productId": "78",
					"unitsPerSR": "3996"
				},
				{
					"productId": "83",
					"unitsPerSR": "2744"
				},
				{
					"productId": "94",
					"unitsPerSR": "2006"
				}
			]
		},
		{
			"bAdalianHoursPerAction": "22",
			"buildingId": "3",
			"id": "80",
			"inputs": [
				{
					"productId": "3",
					"unitsPerSR": "40"
				}
			],
			"mAdalianHoursPerSR": "0.0271",
			"name": "Ammonia Catalytic Cracking",
			"outputs": [
				{
					"productId": "2",
					"unitsPerSR": "6"
				},
				{
					"productId": "180",
					"unitsPerSR": "34"
				}
			]
		},
		{
			"bAdalianHoursPerAction": "80",
			"buildingId": "3",
			"id": "81",
			"inputs": [
				{
					"productId": "3",
					"unitsPerSR": "204"
				},
				{
					"productId": "22",
					"unitsPerSR": "855"
				},
				{
					"productId": "23",
					"unitsPerSR": "32"
				},
				{
					"productId": "55",
					"unitsPerSR": "588"
				}
			],
			"mAdalianHoursPerSR": "0.126",
			"name": "Uraninite Acid Leaching, Solvent Extraction, and Precipitation",
			"outputs": [
				{
					"productId": "96",
					"unitsPerSR": "887"
				}
			]
		},
		{
			"bAdalianHoursPerAction": "76",
			"buildingId": "3",
			"id": "82",
			"inputs": [
				{
					"productId": "3",
					"unitsPerSR": "408"
				},
				{
					"productId": "15",
					"unitsPerSR": "2544"
				},
				{
					"productId": "23",
					"unitsPerSR": "64"
				},
				{
					"productId": "55",
					"unitsPerSR": "1176"
				}
			],
			"mAdalianHoursPerSR": "0.293",
			"name": "Coffinite Acid Leaching, Solvent Extraction, and Precipitation",
			"outputs": [
				{
					"productId": "24",
					"unitsPerSR": "108"
				},
				{
					"productId": "26",
					"unitsPerSR": "180"
				},
				{
					"productId": "96",
					"unitsPerSR": "1774"
				},
				{
					"productId": "114",
					"unitsPerSR": "556"
				}
			]
		},
		{
			"bAdalianHoursPerAction": "18",
			"buildingId": "5",
			"id": "83",
			"inputs": [
				{
					"productId": "88",
					"unitsPerSR": "1"
				}
			],
			"mAdalianHoursPerSR": "0.0002222222222",
			"name": "Alumina Forming and Sintering",
			"outputs": [
				{
					"productId": "97",
					"unitsPerSR": "1"
				}
			]
		},
		{
			"bAdalianHoursPerAction": "14",
			"buildingId": "3",
			"id": "84",
			"inputs": [
				{
					"productId": "31",
					"unitsPerSR": "15"
				},
				{
					"productId": "95",
					"unitsPerSR": "4"
				},
				{
					"productId": "178",
					"unitsPerSR": "1"
				}
			],
			"mAdalianHoursPerSR": "0.0006",
			"name": "Austenitic Nichrome Alloying",
			"outputs": [
				{
					"productId": "98",
					"unitsPerSR": "20"
				}
			]
		},
		{
			"bAdalianHoursPerAction": "20",
			"buildingId": "5",
			"id": "85",
			"inputs": [
				{
					"productId": "43",
					"unitsPerSR": "17"
				},
				{
					"productId": "74",
					"unitsPerSR": "3"
				}
			],
			"mAdalianHoursPerSR": "0.004",
			"name": "Copper Wire Insulating",
			"outputs": [
				{
					"productId": "99",
					"unitsPerSR": "20"
				}
			]
		},
		{
			"bAdalianHoursPerAction": "80",
			"buildingId": "5",
			"id": "86",
			"inputs": [
				{
					"productId": "53",
					"unitsPerSR": "720000"
				},
				{
					"productId": "83",
					"unitsPerSR": "1"
				}
			],
			"mAdalianHoursPerSR": "1800",
			"name": "Silicon Czochralski Process and Wafer Slicing",
			"outputs": [
				{
					"productId": "100",
					"unitsPerSR": "432000"
				}
			]
		},
		{
			"bAdalianHoursPerAction": "20",
			"buildingId": "5",
			"id": "87",
			"inputs": [
				{
					"productId": "72",
					"unitsPerSR": "1"
				}
			],
			"mAdalianHoursPerSR": "0.00008333333333",
			"name": "Steel Cable Laying",
			"outputs": [
				{
					"productId": "101",
					"unitsPerSR": "1"
				}
			]
		},
		{
			"bAdalianHoursPerAction": "24",
			"buildingId": "3",
			"id": "88",
			"inputs": [
				{
					"productId": "5",
					"unitsPerSR": "1"
				},
				{
					"productId": "73",
					"unitsPerSR": "50"
				}
			],
			"mAdalianHoursPerSR": "0.00255",
			"name": "Acrylonitrile Polymerization",
			"outputs": [
				{
					"productId": "102",
					"unitsPerSR": "50"
				}
			]
		},
		{
			"bAdalianHoursPerAction": "32",
			"buildingId": "4",
			"id": "89",
			"inputs": [
				{
					"productId": "3",
					"unitsPerSR": "2600"
				},
				{
					"productId": "6",
					"unitsPerSR": "52000"
				},
				{
					"productId": "24",
					"unitsPerSR": "2200"
				},
				{
					"productId": "35",
					"unitsPerSR": "640"
				},
				{
					"productId": "36",
					"unitsPerSR": "400"
				},
				{
					"productId": "46",
					"unitsPerSR": "840"
				}
			],
			"mAdalianHoursPerSR": "1800",
			"name": "Soybean Growing",
			"outputs": [
				{
					"productId": "91",
					"unitsPerSR": "26000"
				}
			]
		},
		{
			"bAdalianHoursPerAction": "6",
			"buildingId": "3",
			"id": "90",
			"inputs": [
				{
					"productId": "84",
					"unitsPerSR": "124"
				}
			],
			"mAdalianHoursPerSR": "0.00005722222222",
			"name": "Boric Acid Thermal Decomposition",
			"outputs": [
				{
					"productId": "24",
					"unitsPerSR": "54"
				},
				{
					"productId": "79",
					"unitsPerSR": "70"
				}
			]
		},
		{
			"bAdalianHoursPerAction": "7",
			"buildingId": "3",
			"id": "91",
			"inputs": [
				{
					"productId": "48",
					"unitsPerSR": "74"
				},
				{
					"productId": "81",
					"unitsPerSR": "73"
				}
			],
			"mAdalianHoursPerSR": "0.0184",
			"name": "Lithium Carbonate Chlorination",
			"outputs": [
				{
					"productId": "6",
					"unitsPerSR": "44"
				},
				{
					"productId": "24",
					"unitsPerSR": "18"
				},
				{
					"productId": "105",
					"unitsPerSR": "85"
				}
			]
		},
		{
			"bAdalianHoursPerAction": "5",
			"buildingId": "3",
			"id": "92",
			"inputs": [
				{
					"productId": "77",
					"unitsPerSR": "106"
				},
				{
					"productId": "80",
					"unitsPerSR": "110"
				}
			],
			"mAdalianHoursPerSR": "0.0216",
			"name": "Lithium Sulfate Carbonation",
			"outputs": [
				{
					"productId": "48",
					"unitsPerSR": "74"
				}
			]
		},
		{
			"bAdalianHoursPerAction": "8",
			"buildingId": "3",
			"id": "93",
			"inputs": [
				{
					"productId": "7",
					"unitsPerSR": "112"
				},
				{
					"productId": "63",
					"unitsPerSR": "232"
				}
			],
			"mAdalianHoursPerSR": "0.0112",
			"name": "Iron Oxide Direct Reduction",
			"outputs": [
				{
					"productId": "6",
					"unitsPerSR": "176"
				},
				{
					"productId": "29",
					"unitsPerSR": "168"
				}
			]
		},
		{
			"bAdalianHoursPerAction": "12",
			"buildingId": "3",
			"id": "94",
			"inputs": [
				{
					"productId": "7",
					"unitsPerSR": "28"
				},
				{
					"productId": "85",
					"unitsPerSR": "81"
				}
			],
			"mAdalianHoursPerSR": "0.00327",
			"name": "Zinc Oxide Direct Reduction",
			"outputs": [
				{
					"productId": "6",
					"unitsPerSR": "44"
				},
				{
					"productId": "106",
					"unitsPerSR": "65"
				}
			]
		},
		{
			"bAdalianHoursPerAction": "16",
			"buildingId": "3",
			"id": "95",
			"inputs": [
				{
					"productId": "7",
					"unitsPerSR": "28"
				},
				{
					"productId": "86",
					"unitsPerSR": "75"
				}
			],
			"mAdalianHoursPerSR": "0.0034",
			"name": "Nickel Oxide Direct Reduction",
			"outputs": [
				{
					"productId": "6",
					"unitsPerSR": "44"
				},
				{
					"productId": "31",
					"unitsPerSR": "59"
				}
			]
		},
		{
			"bAdalianHoursPerAction": "8",
			"buildingId": "3",
			"id": "96",
			"inputs": [
				{
					"productId": "57",
					"unitsPerSR": "28"
				},
				{
					"productId": "87",
					"unitsPerSR": "20"
				}
			],
			"mAdalianHoursPerSR": "0.096",
			"name": "Pidgeon Process",
			"outputs": [
				{
					"productId": "26",
					"unitsPerSR": "15"
				},
				{
					"productId": "29",
					"unitsPerSR": "21"
				},
				{
					"productId": "75",
					"unitsPerSR": "12"
				}
			]
		},
		{
			"bAdalianHoursPerAction": "15",
			"buildingId": "3",
			"id": "97",
			"inputs": [
				{
					"productId": "74",
					"unitsPerSR": "42"
				},
				{
					"productId": "76",
					"unitsPerSR": "142"
				},
				{
					"productId": "89",
					"unitsPerSR": "80"
				}
			],
			"mAdalianHoursPerSR": "0.0002111111111",
			"name": "Polypropylene Chlorination and Basification",
			"outputs": [
				{
					"productId": "24",
					"unitsPerSR": "18"
				},
				{
					"productId": "45",
					"unitsPerSR": "117"
				},
				{
					"productId": "81",
					"unitsPerSR": "36"
				},
				{
					"productId": "107",
					"unitsPerSR": "93"
				}
			]
		},
		{
			"bAdalianHoursPerAction": "36",
			"buildingId": "4",
			"id": "98",
			"inputs": [
				{
					"productId": "3",
					"unitsPerSR": "590"
				},
				{
					"productId": "6",
					"unitsPerSR": "22000"
				},
				{
					"productId": "24",
					"unitsPerSR": "60000"
				},
				{
					"productId": "35",
					"unitsPerSR": "290"
				},
				{
					"productId": "36",
					"unitsPerSR": "100"
				},
				{
					"productId": "46",
					"unitsPerSR": "830"
				}
			],
			"mAdalianHoursPerSR": "2160",
			"name": "Potato Growing",
			"outputs": [
				{
					"productId": "92",
					"unitsPerSR": "75600"
				}
			]
		},
		{
			"bAdalianHoursPerAction": "6",
			"buildingId": "3",
			"id": "99",
			"inputs": [
				{
					"productId": "89",
					"unitsPerSR": "960"
				},
				{
					"productId": "93",
					"unitsPerSR": "1488"
				},
				{
					"productId": "94",
					"unitsPerSR": "2078"
				}
			],
			"mAdalianHoursPerSR": "0.109",
			"name": "Rare Earths Oxalation and Calcination",
			"outputs": [
				{
					"productId": "3",
					"unitsPerSR": "408"
				},
				{
					"productId": "6",
					"unitsPerSR": "528"
				},
				{
					"productId": "7",
					"unitsPerSR": "336"
				},
				{
					"productId": "24",
					"unitsPerSR": "432"
				},
				{
					"productId": "109",
					"unitsPerSR": "1118"
				}
			]
		},
		{
			"bAdalianHoursPerAction": "8",
			"buildingId": "3",
			"id": "100",
			"inputs": [
				{
					"productId": "3",
					"unitsPerSR": "17"
				},
				{
					"productId": "81",
					"unitsPerSR": "36"
				}
			],
			"mAdalianHoursPerSR": "0.0001272222222",
			"name": "Ammonia Chlorination",
			"outputs": [
				{
					"productId": "110",
					"unitsPerSR": "53"
				}
			]
		},
		{
			"bAdalianHoursPerAction": "22",
			"buildingId": "3",
			"id": "101",
			"inputs": [
				{
					"productId": "19",
					"unitsPerSR": "36"
				},
				{
					"productId": "88",
					"unitsPerSR": "102"
				}
			],
			"mAdalianHoursPerSR": "0.027",
			"name": "Hall–Heroult Process",
			"outputs": [
				{
					"productId": "7",
					"unitsPerSR": "84"
				},
				{
					"productId": "111",
					"unitsPerSR": "54"
				}
			]
		},
		{
			"bAdalianHoursPerAction": "20",
			"buildingId": "3",
			"id": "102",
			"inputs": [
				{
					"productId": "78",
					"unitsPerSR": "111"
				}
			],
			"mAdalianHoursPerSR": "0.0888",
			"name": "Calcium Chloride Molten Salt Electrolysis",
			"outputs": [
				{
					"productId": "76",
					"unitsPerSR": "71"
				},
				{
					"productId": "112",
					"unitsPerSR": "40"
				}
			]
		},
		{
			"bAdalianHoursPerAction": "4",
			"buildingId": "5",
			"id": "103",
			"inputs": [
				{
					"productId": "24",
					"unitsPerSR": "5"
				},
				{
					"productId": "32",
					"unitsPerSR": "3"
				}
			],
			"mAdalianHoursPerSR": "0.0001",
			"name": "Cement Mixing",
			"outputs": [
				{
					"productId": "44",
					"unitsPerSR": "8"
				}
			]
		},
		{
			"bAdalianHoursPerAction": "80",
			"buildingId": "4",
			"id": "104",
			"inputs": [
				{
					"productId": "3",
					"unitsPerSR": "580"
				},
				{
					"productId": "6",
					"unitsPerSR": "23000"
				},
				{
					"productId": "24",
					"unitsPerSR": "8100"
				},
				{
					"productId": "35",
					"unitsPerSR": "220"
				},
				{
					"productId": "36",
					"unitsPerSR": "350"
				},
				{
					"productId": "46",
					"unitsPerSR": "290"
				}
			],
			"mAdalianHoursPerSR": "8740",
			"name": "Natural Flavorings Growing",
			"outputs": [
				{
					"productId": "103",
					"unitsPerSR": "15500"
				}
			]
		},
		{
			"bAdalianHoursPerAction": "54",
			"buildingId": "3",
			"id": "105",
			"inputs": [
				{
					"productId": "54",
					"unitsPerSR": "504"
				},
				{
					"productId": "96",
					"unitsPerSR": "887"
				}
			],
			"mAdalianHoursPerSR": "0.0493",
			"name": "Yellowcake Digestion, Solvent Extraction, and Precipitation",
			"outputs": [
				{
					"productId": "24",
					"unitsPerSR": "72"
				},
				{
					"productId": "115",
					"unitsPerSR": "1182"
				}
			]
		},
		{
			"bAdalianHoursPerAction": "48",
			"buildingId": "3",
			"id": "106",
			"inputs": [
				{
					"productId": "82",
					"unitsPerSR": "20"
				},
				{
					"productId": "195",
					"unitsPerSR": "58"
				}
			],
			"mAdalianHoursPerSR": "0.0507",
			"name": "Hydrofluoric Acid Cold Electrolysis",
			"outputs": [
				{
					"productId": "2",
					"unitsPerSR": "1"
				},
				{
					"productId": "116",
					"unitsPerSR": "38"
				}
			]
		},
		{
			"bAdalianHoursPerAction": "12",
			"buildingId": "3",
			"id": "107",
			"inputs": [
				{
					"productId": "18",
					"unitsPerSR": "21958"
				},
				{
					"productId": "23",
					"unitsPerSR": "12896"
				},
				{
					"productId": "24",
					"unitsPerSR": "4104"
				}
			],
			"mAdalianHoursPerSR": "0.974",
			"name": "Rhabdite Roasting and Acid Extraction",
			"outputs": [
				{
					"productId": "83",
					"unitsPerSR": "14890"
				},
				{
					"productId": "190",
					"unitsPerSR": "24068"
				}
			]
		},
		{
			"bAdalianHoursPerAction": "22",
			"buildingId": "3",
			"id": "108",
			"inputs": [
				{
					"productId": "23",
					"unitsPerSR": "32"
				},
				{
					"productId": "63",
					"unitsPerSR": "926"
				},
				{
					"productId": "85",
					"unitsPerSR": "244"
				},
				{
					"productId": "86",
					"unitsPerSR": "224"
				}
			],
			"mAdalianHoursPerSR": "0.357",
			"name": "Ferrite Sintering",
			"outputs": [
				{
					"productId": "118",
					"unitsPerSR": "1426"
				}
			]
		},
		{
			"bAdalianHoursPerAction": "48",
			"buildingId": "5",
			"id": "109",
			"inputs": [
				{
					"productId": "74",
					"unitsPerSR": "70"
				},
				{
					"productId": "84",
					"unitsPerSR": "1"
				},
				{
					"productId": "100",
					"unitsPerSR": "350"
				}
			],
			"mAdalianHoursPerSR": "10.5",
			"name": "Diode Doping and Assembly",
			"outputs": [
				{
					"productId": "119",
					"unitsPerSR": "420"
				}
			]
		},
		{
			"bAdalianHoursPerAction": "28",
			"buildingId": "5",
			"id": "110",
			"inputs": [
				{
					"productId": "111",
					"unitsPerSR": "1"
				}
			],
			"mAdalianHoursPerSR": "0.0005",
			"name": "Ball Valve Machining",
			"outputs": [
				{
					"productId": "121",
					"unitsPerSR": "1"
				}
			]
		},
		{
			"bAdalianHoursPerAction": "30",
			"buildingId": "5",
			"id": "111",
			"inputs": [
				{
					"productId": "111",
					"unitsPerSR": "1"
				}
			],
			"mAdalianHoursPerSR": "0.00004",
			"name": "Aluminium Beam Rolling",
			"outputs": [
				{
					"productId": "122",
					"unitsPerSR": "1"
				}
			]
		},
		{
			"bAdalianHoursPerAction": "28",
			"buildingId": "5",
			"id": "112",
			"inputs": [
				{
					"productId": "111",
					"unitsPerSR": "1"
				}
			],
			"mAdalianHoursPerSR": "0.00004555555556",
			"name": "Aluminium Sheet Rolling",
			"outputs": [
				{
					"productId": "123",
					"unitsPerSR": "1"
				}
			]
		},
		{
			"bAdalianHoursPerAction": "31",
			"buildingId": "5",
			"id": "113",
			"inputs": [
				{
					"productId": "111",
					"unitsPerSR": "1"
				}
			],
			"mAdalianHoursPerSR": "0.00005",
			"name": "Aluminium Pipe Rolling",
			"outputs": [
				{
					"productId": "124",
					"unitsPerSR": "1"
				}
			]
		},
		{
			"bAdalianHoursPerAction": "20",
			"buildingId": "5",
			"id": "114",
			"inputs": [
				{
					"productId": "102",
					"unitsPerSR": "1"
				}
			],
			"mAdalianHoursPerSR": "0.0005",
			"name": "Polyacrylonitrile Weaving",
			"outputs": [
				{
					"productId": "125",
					"unitsPerSR": "1"
				}
			]
		},
		{
			"bAdalianHoursPerAction": "16",
			"buildingId": "5",
			"id": "115",
			"inputs": [
				{
					"productId": "111",
					"unitsPerSR": "3"
				}
			],
			"mAdalianHoursPerSR": "0.004",
			"name": "Cold Gas Thruster Printing",
			"outputs": [
				{
					"productId": "126",
					"unitsPerSR": "1"
				}
			]
		},
		{
			"bAdalianHoursPerAction": "16",
			"buildingId": "3",
			"id": "116",
			"inputs": [
				{
					"productId": "23",
					"unitsPerSR": "224"
				},
				{
					"productId": "102",
					"unitsPerSR": "212"
				}
			],
			"mAdalianHoursPerSR": "0.00131",
			"name": "Polyacrylonitrile Oxidation and Carbonization",
			"outputs": [
				{
					"productId": "24",
					"unitsPerSR": "108"
				},
				{
					"productId": "128",
					"unitsPerSR": "144"
				}
			]
		},
		{
			"bAdalianHoursPerAction": "18",
			"buildingId": "5",
			"id": "117",
			"inputs": [
				{
					"productId": "111",
					"unitsPerSR": "6"
				}
			],
			"mAdalianHoursPerSR": "0.002",
			"name": "Aluminium Small Propellant Tank Assembly",
			"outputs": [
				{
					"productId": "130",
					"unitsPerSR": "1"
				}
			]
		},
		{
			"bAdalianHoursPerAction": "24",
			"buildingId": "3",
			"id": "118",
			"inputs": [
				{
					"productId": "26",
					"unitsPerSR": "15"
				},
				{
					"productId": "77",
					"unitsPerSR": "2"
				},
				{
					"productId": "79",
					"unitsPerSR": "2"
				},
				{
					"productId": "88",
					"unitsPerSR": "1"
				}
			],
			"mAdalianHoursPerSR": "0.00184",
			"name": "Borosilicate Glassmaking",
			"outputs": [
				{
					"productId": "131",
					"unitsPerSR": "20"
				}
			]
		},
		{
			"bAdalianHoursPerAction": "36",
			"buildingId": "5",
			"id": "119",
			"inputs": [
				{
					"productId": "52",
					"unitsPerSR": "53"
				},
				{
					"productId": "102",
					"unitsPerSR": "2"
				}
			],
			"mAdalianHoursPerSR": "0.0183",
			"name": "Ball Bearing Machining and Assembly",
			"outputs": [
				{
					"productId": "132",
					"unitsPerSR": "55"
				}
			]
		},
		{
			"bAdalianHoursPerAction": "40",
			"buildingId": "5",
			"id": "120",
			"inputs": [
				{
					"productId": "52",
					"unitsPerSR": "2000"
				}
			],
			"mAdalianHoursPerSR": "0.125",
			"name": "Large Thrust Bearing Machining and Assembly",
			"outputs": [
				{
					"productId": "133",
					"unitsPerSR": "1"
				}
			]
		},
		{
			"bAdalianHoursPerAction": "16",
			"buildingId": "3",
			"id": "121",
			"inputs": [
				{
					"productId": "75",
					"unitsPerSR": "73"
				},
				{
					"productId": "79",
					"unitsPerSR": "70"
				}
			],
			"mAdalianHoursPerSR": "0.011",
			"name": "Boron Trioxide Magnesiothermic Reduction",
			"outputs": [
				{
					"productId": "87",
					"unitsPerSR": "121"
				},
				{
					"productId": "134",
					"unitsPerSR": "22"
				}
			]
		},
		{
			"bAdalianHoursPerAction": "40",
			"buildingId": "3",
			"id": "122",
			"inputs": [
				{
					"productId": "46",
					"unitsPerSR": "75"
				},
				{
					"productId": "105",
					"unitsPerSR": "42"
				}
			],
			"mAdalianHoursPerSR": "0.0772",
			"name": "Lithium Chloride Molten Salt Electrolysis",
			"outputs": [
				{
					"productId": "76",
					"unitsPerSR": "71"
				},
				{
					"productId": "135",
					"unitsPerSR": "7"
				}
			]
		},
		{
			"bAdalianHoursPerAction": "30",
			"buildingId": "3",
			"id": "123",
			"inputs": [
				{
					"productId": "89",
					"unitsPerSR": "120"
				},
				{
					"productId": "107",
					"unitsPerSR": "278"
				},
				{
					"productId": "108",
					"unitsPerSR": "456"
				}
			],
			"mAdalianHoursPerSR": "0.0899",
			"name": "Diepoxy Step Growth Polymerization",
			"outputs": [
				{
					"productId": "24",
					"unitsPerSR": "54"
				},
				{
					"productId": "45",
					"unitsPerSR": "175"
				},
				{
					"productId": "197",
					"unitsPerSR": "625"
				}
			]
		},
		{
			"bAdalianHoursPerAction": "48",
			"buildingId": "3",
			"id": "124",
			"inputs": [
				{
					"productId": "109",
					"unitsPerSR": "1118"
				}
			],
			"mAdalianHoursPerSR": "0.00559",
			"name": "Rare Earth Oxides Ion Exchange",
			"outputs": [
				{
					"productId": "137",
					"unitsPerSR": "336"
				},
				{
					"productId": "138",
					"unitsPerSR": "452"
				}
			]
		},
		{
			"bAdalianHoursPerAction": "14",
			"buildingId": "3",
			"id": "125",
			"inputs": [
				{
					"productId": "32",
					"unitsPerSR": "168"
				},
				{
					"productId": "111",
					"unitsPerSR": "54"
				}
			],
			"mAdalianHoursPerSR": "0.0159",
			"name": "Calcium Oxide Aluminothermic Reduction",
			"outputs": [
				{
					"productId": "88",
					"unitsPerSR": "102"
				},
				{
					"productId": "112",
					"unitsPerSR": "120"
				}
			]
		},
		{
			"bAdalianHoursPerAction": "64",
			"buildingId": "3",
			"id": "126",
			"inputs": [
				{
					"productId": "81",
					"unitsPerSR": "73"
				},
				{
					"productId": "113",
					"unitsPerSR": "324"
				}
			],
			"mAdalianHoursPerSR": "0.018",
			"name": "Sodium Chromate Acidification and Crystallization",
			"outputs": [
				{
					"productId": "24",
					"unitsPerSR": "18"
				},
				{
					"productId": "45",
					"unitsPerSR": "117"
				},
				{
					"productId": "139",
					"unitsPerSR": "262"
				}
			]
		},
		{
			"bAdalianHoursPerAction": "20",
			"buildingId": "3",
			"id": "127",
			"inputs": [
				{
					"productId": "55",
					"unitsPerSR": "98"
				}
			],
			"mAdalianHoursPerSR": "0.0005880555556",
			"name": "Sulfuric Acid Hot Catalytic Reduction",
			"outputs": [
				{
					"productId": "5",
					"unitsPerSR": "64"
				},
				{
					"productId": "23",
					"unitsPerSR": "16"
				},
				{
					"productId": "24",
					"unitsPerSR": "18"
				}
			]
		},
		{
			"bAdalianHoursPerAction": "15",
			"buildingId": "3",
			"id": "128",
			"inputs": [
				{
					"productId": "29",
					"unitsPerSR": "2401"
				},
				{
					"productId": "65",
					"unitsPerSR": "7198"
				},
				{
					"productId": "111",
					"unitsPerSR": "2698"
				}
			],
			"mAdalianHoursPerSR": "1.02",
			"name": "Molybdenum Trioxide Aluminothermic Reduction and Alloying",
			"outputs": [
				{
					"productId": "88",
					"unitsPerSR": "5098"
				},
				{
					"productId": "141",
					"unitsPerSR": "7199"
				}
			]
		},
		{
			"bAdalianHoursPerAction": "28",
			"buildingId": "3",
			"id": "129",
			"inputs": [
				{
					"productId": "3",
					"unitsPerSR": "324"
				},
				{
					"productId": "24",
					"unitsPerSR": "18"
				},
				{
					"productId": "115",
					"unitsPerSR": "5516"
				}
			],
			"mAdalianHoursPerSR": "0.976",
			"name": "Uranyl Nitrate Redox and Precipitation",
			"outputs": [
				{
					"productId": "142",
					"unitsPerSR": "4369"
				}
			]
		},
		{
			"bAdalianHoursPerAction": "48",
			"buildingId": "3",
			"id": "130",
			"inputs": [
				{
					"productId": "3",
					"unitsPerSR": "170"
				},
				{
					"productId": "24",
					"unitsPerSR": "396"
				},
				{
					"productId": "117",
					"unitsPerSR": "3526"
				}
			],
			"mAdalianHoursPerSR": "0.0196",
			"name": "Sodium Tungstate Ion Exchange, Precipitation, and Crystallization",
			"outputs": [
				{
					"productId": "89",
					"unitsPerSR": "960"
				},
				{
					"productId": "143",
					"unitsPerSR": "3132"
				}
			]
		},
		{
			"bAdalianHoursPerAction": "24",
			"buildingId": "3",
			"id": "131",
			"inputs": [
				{
					"productId": "29",
					"unitsPerSR": "99"
				},
				{
					"productId": "31",
					"unitsPerSR": "16"
				},
				{
					"productId": "95",
					"unitsPerSR": "76"
				},
				{
					"productId": "141",
					"unitsPerSR": "9"
				}
			],
			"mAdalianHoursPerSR": "0.0096",
			"name": "Stainless Steel Alloying",
			"outputs": [
				{
					"productId": "151",
					"unitsPerSR": "200"
				}
			]
		},
		{
			"bAdalianHoursPerAction": "60",
			"buildingId": "5",
			"id": "132",
			"inputs": [
				{
					"productId": "30",
					"unitsPerSR": "20"
				},
				{
					"productId": "42",
					"unitsPerSR": "108"
				},
				{
					"productId": "61",
					"unitsPerSR": "1"
				},
				{
					"productId": "136",
					"unitsPerSR": "71"
				}
			],
			"mAdalianHoursPerSR": "0.333",
			"name": "Board Printing",
			"outputs": [
				{
					"productId": "152",
					"unitsPerSR": "200"
				}
			]
		},
		{
			"bAdalianHoursPerAction": "54",
			"buildingId": "5",
			"id": "133",
			"inputs": [
				{
					"productId": "99",
					"unitsPerSR": "1"
				},
				{
					"productId": "118",
					"unitsPerSR": "8"
				},
				{
					"productId": "136",
					"unitsPerSR": "1"
				}
			],
			"mAdalianHoursPerSR": "0.0333",
			"name": "Ferrite-bead Inductor Winding",
			"outputs": [
				{
					"productId": "153",
					"unitsPerSR": "10"
				}
			]
		},
		{
			"bAdalianHoursPerAction": "16",
			"buildingId": "5",
			"id": "134",
			"inputs": [
				{
					"productId": "71",
					"unitsPerSR": "2"
				}
			],
			"mAdalianHoursPerSR": "0.025",
			"name": "Core Drill Bit Milling",
			"outputs": [
				{
					"productId": "154",
					"unitsPerSR": "1"
				}
			]
		},
		{
			"bAdalianHoursPerAction": "12",
			"buildingId": "5",
			"id": "135",
			"inputs": [
				{
					"productId": "124",
					"unitsPerSR": "5"
				},
				{
					"productId": "127",
					"unitsPerSR": "5"
				},
				{
					"productId": "130",
					"unitsPerSR": "5"
				},
				{
					"productId": "132",
					"unitsPerSR": "1"
				}
			],
			"mAdalianHoursPerSR": "0.0833",
			"name": "Core Drill Thruster Assembly",
			"outputs": [
				{
					"productId": "155",
					"unitsPerSR": "5"
				}
			]
		},
		{
			"bAdalianHoursPerAction": "32",
			"buildingId": "5",
			"id": "136",
			"inputs": [
				{
					"productId": "99",
					"unitsPerSR": "7"
				},
				{
					"productId": "122",
					"unitsPerSR": "20"
				},
				{
					"productId": "128",
					"unitsPerSR": "27"
				},
				{
					"productId": "136",
					"unitsPerSR": "18"
				}
			],
			"mAdalianHoursPerSR": "0.1",
			"name": "Parabolic Dish Assembly",
			"outputs": [
				{
					"productId": "156",
					"unitsPerSR": "1"
				}
			]
		},
		{
			"bAdalianHoursPerAction": "32",
			"buildingId": "5",
			"id": "137",
			"inputs": [
				{
					"productId": "99",
					"unitsPerSR": "1"
				},
				{
					"productId": "100",
					"unitsPerSR": "4"
				},
				{
					"productId": "123",
					"unitsPerSR": "2"
				},
				{
					"productId": "131",
					"unitsPerSR": "1"
				}
			],
			"mAdalianHoursPerSR": "0.05",
			"name": "Photovoltaic Panel Amorphization and Assembly",
			"outputs": [
				{
					"productId": "157",
					"unitsPerSR": "5"
				}
			]
		},
		{
			"bAdalianHoursPerAction": "36",
			"buildingId": "5",
			"id": "138",
			"inputs": [
				{
					"productId": "30",
					"unitsPerSR": "1"
				},
				{
					"productId": "102",
					"unitsPerSR": "28"
				},
				{
					"productId": "111",
					"unitsPerSR": "1"
				},
				{
					"productId": "135",
					"unitsPerSR": "20"
				}
			],
			"mAdalianHoursPerSR": "0.125",
			"name": "LiPo Battery Assembly",
			"outputs": [
				{
					"productId": "158",
					"unitsPerSR": "10"
				}
			]
		},
		{
			"bAdalianHoursPerAction": "12",
			"buildingId": "3",
			"id": "139",
			"inputs": [
				{
					"productId": "110",
					"unitsPerSR": "321"
				},
				{
					"productId": "137",
					"unitsPerSR": "336"
				}
			],
			"mAdalianHoursPerSR": "0.00131",
			"name": "Neodymium Oxide Chlorination",
			"outputs": [
				{
					"productId": "3",
					"unitsPerSR": "102"
				},
				{
					"productId": "24",
					"unitsPerSR": "54"
				},
				{
					"productId": "159",
					"unitsPerSR": "501"
				}
			]
		},
		{
			"bAdalianHoursPerAction": "30",
			"buildingId": "3",
			"id": "141",
			"inputs": [
				{
					"productId": "51",
					"unitsPerSR": "32"
				},
				{
					"productId": "139",
					"unitsPerSR": "262"
				}
			],
			"mAdalianHoursPerSR": "0.01",
			"name": "Sodium Dichromate Hot Sulfur Reduction",
			"outputs": [
				{
					"productId": "161",
					"unitsPerSR": "152"
				}
			]
		},
		{
			"bAdalianHoursPerAction": "16",
			"buildingId": "5",
			"id": "142",
			"inputs": [
				{
					"productId": "140",
					"unitsPerSR": "2"
				}
			],
			"mAdalianHoursPerSR": "0.001",
			"name": "Photoresist Epoxy Stoichiometry and Packaging",
			"outputs": [
				{
					"productId": "162",
					"unitsPerSR": "1"
				}
			]
		},
		{
			"bAdalianHoursPerAction": "28",
			"buildingId": "3",
			"id": "143",
			"inputs": [
				{
					"productId": "2",
					"unitsPerSR": "4"
				},
				{
					"productId": "142",
					"unitsPerSR": "624"
				}
			],
			"mAdalianHoursPerSR": "0.0176",
			"name": "Ammonium Diuranate Calcination and Hydrogen Reduction",
			"outputs": [
				{
					"productId": "3",
					"unitsPerSR": "34"
				},
				{
					"productId": "24",
					"unitsPerSR": "54"
				},
				{
					"productId": "163",
					"unitsPerSR": "540"
				}
			]
		},
		{
			"bAdalianHoursPerAction": "16",
			"buildingId": "3",
			"id": "144",
			"inputs": [
				{
					"productId": "2",
					"unitsPerSR": "72"
				},
				{
					"productId": "143",
					"unitsPerSR": "3132"
				}
			],
			"mAdalianHoursPerSR": "0.0881",
			"name": "Ammonium Paratungstate Calcination and Hydrogen Reduction",
			"outputs": [
				{
					"productId": "3",
					"unitsPerSR": "170"
				},
				{
					"productId": "24",
					"unitsPerSR": "828"
				},
				{
					"productId": "164",
					"unitsPerSR": "2206"
				}
			]
		},
		{
			"bAdalianHoursPerAction": "96",
			"buildingId": "6",
			"id": "145",
			"inputs": [
				{
					"productId": "98",
					"unitsPerSR": "300"
				}
			],
			"mAdalianHoursPerSR": "17",
			"name": "Engine Bell Additive Manufacturing",
			"outputs": [
				{
					"productId": "144",
					"unitsPerSR": "1"
				}
			]
		},
		{
			"bAdalianHoursPerAction": "42",
			"buildingId": "6",
			"id": "146",
			"inputs": [
				{
					"productId": "69",
					"unitsPerSR": "1500"
				}
			],
			"mAdalianHoursPerSR": "12",
			"name": "Steel Truss Construction",
			"outputs": [
				{
					"productId": "145",
					"unitsPerSR": "1"
				}
			]
		},
		{
			"bAdalianHoursPerAction": "48",
			"buildingId": "6",
			"id": "147",
			"inputs": [
				{
					"productId": "123",
					"unitsPerSR": "600"
				}
			],
			"mAdalianHoursPerSR": "8",
			"name": "Aluminium Hull Plate Construction",
			"outputs": [
				{
					"productId": "146",
					"unitsPerSR": "1"
				}
			]
		},
		{
			"bAdalianHoursPerAction": "50",
			"buildingId": "6",
			"id": "148",
			"inputs": [
				{
					"productId": "122",
					"unitsPerSR": "1000"
				}
			],
			"mAdalianHoursPerSR": "11",
			"name": "Aluminium Truss Construction",
			"outputs": [
				{
					"productId": "147",
					"unitsPerSR": "1"
				}
			]
		},
		{
			"bAdalianHoursPerAction": "80",
			"buildingId": "6",
			"id": "149",
			"inputs": [
				{
					"productId": "122",
					"unitsPerSR": "3000"
				},
				{
					"productId": "123",
					"unitsPerSR": "2000"
				}
			],
			"mAdalianHoursPerSR": "14",
			"name": "Cargo Module Construction",
			"outputs": [
				{
					"productId": "148",
					"unitsPerSR": "1"
				}
			]
		},
		{
			"bAdalianHoursPerAction": "160",
			"buildingId": "6",
			"id": "150",
			"inputs": [
				{
					"productId": "123",
					"unitsPerSR": "1850"
				}
			],
			"mAdalianHoursPerSR": "22",
			"name": "Aluminium Pressure Vessel Construction",
			"outputs": [
				{
					"productId": "149",
					"unitsPerSR": "1"
				}
			]
		},
		{
			"bAdalianHoursPerAction": "84",
			"buildingId": "6",
			"id": "151",
			"inputs": [
				{
					"productId": "123",
					"unitsPerSR": "3500"
				}
			],
			"mAdalianHoursPerSR": "16",
			"name": "Aluminium Propellant Tank Construction",
			"outputs": [
				{
					"productId": "150",
					"unitsPerSR": "1"
				}
			]
		},
		{
			"bAdalianHoursPerAction": "144",
			"buildingId": "6",
			"id": "152",
			"inputs": [
				{
					"productId": "146",
					"unitsPerSR": "10"
				},
				{
					"productId": "147",
					"unitsPerSR": "4"
				},
				{
					"productId": "150",
					"unitsPerSR": "8"
				},
				{
					"productId": "235",
					"unitsPerSR": "3"
				}
			],
			"mAdalianHoursPerSR": "144",
			"name": "Shuttle Hull Construction",
			"outputs": [
				{
					"productId": "165",
					"unitsPerSR": "1"
				}
			]
		},
		{
			"bAdalianHoursPerAction": "192",
			"buildingId": "6",
			"id": "153",
			"inputs": [
				{
					"productId": "145",
					"unitsPerSR": "6"
				},
				{
					"productId": "146",
					"unitsPerSR": "8"
				},
				{
					"productId": "150",
					"unitsPerSR": "16"
				},
				{
					"productId": "235",
					"unitsPerSR": "2"
				}
			],
			"mAdalianHoursPerSR": "192",
			"name": "Light Transport Hull Construction",
			"outputs": [
				{
					"productId": "166",
					"unitsPerSR": "1"
				}
			]
		},
		{
			"bAdalianHoursPerAction": "160",
			"buildingId": "6",
			"id": "154",
			"inputs": [
				{
					"productId": "122",
					"unitsPerSR": "8000"
				},
				{
					"productId": "133",
					"unitsPerSR": "1"
				}
			],
			"mAdalianHoursPerSR": "44",
			"name": "Cargo Ring Construction",
			"outputs": [
				{
					"productId": "167",
					"unitsPerSR": "1"
				}
			]
		},
		{
			"bAdalianHoursPerAction": "480",
			"buildingId": "6",
			"id": "155",
			"inputs": [
				{
					"productId": "145",
					"unitsPerSR": "32"
				},
				{
					"productId": "146",
					"unitsPerSR": "96"
				},
				{
					"productId": "150",
					"unitsPerSR": "96"
				},
				{
					"productId": "167",
					"unitsPerSR": "3"
				},
				{
					"productId": "235",
					"unitsPerSR": "4"
				}
			],
			"mAdalianHoursPerSR": "480",
			"name": "Heavy Transport Hull Construction",
			"outputs": [
				{
					"productId": "168",
					"unitsPerSR": "1"
				}
			]
		},
		{
			"bAdalianHoursPerAction": "16",
			"buildingId": "5",
			"id": "156",
			"inputs": [
				{
					"productId": "164",
					"unitsPerSR": "1"
				}
			],
			"mAdalianHoursPerSR": "0.00125",
			"name": "Tungsten Gas Atomization",
			"outputs": [
				{
					"productId": "169",
					"unitsPerSR": "1"
				}
			]
		},
		{
			"bAdalianHoursPerAction": "8",
			"buildingId": "3",
			"id": "157",
			"inputs": [
				{
					"productId": "2",
					"unitsPerSR": "97"
				},
				{
					"productId": "66",
					"unitsPerSR": "2"
				},
				{
					"productId": "169",
					"unitsPerSR": "1"
				}
			],
			"mAdalianHoursPerSR": "0.02",
			"name": "Hydrogen Cryocooling and Reactor Consumables Stoichiometry",
			"outputs": [
				{
					"productId": "170",
					"unitsPerSR": "100"
				}
			]
		},
		{
			"bAdalianHoursPerAction": "32",
			"buildingId": "5",
			"id": "158",
			"inputs": [
				{
					"productId": "151",
					"unitsPerSR": "1"
				}
			],
			"mAdalianHoursPerSR": "0.00005",
			"name": "Stainless Steel Sheet Rolling",
			"outputs": [
				{
					"productId": "171",
					"unitsPerSR": "1"
				}
			]
		},
		{
			"bAdalianHoursPerAction": "32",
			"buildingId": "5",
			"id": "159",
			"inputs": [
				{
					"productId": "151",
					"unitsPerSR": "1"
				}
			],
			"mAdalianHoursPerSR": "0.00005",
			"name": "Stainless Steel Pipe Rolling",
			"outputs": [
				{
					"productId": "172",
					"unitsPerSR": "1"
				}
			]
		},
		{
			"bAdalianHoursPerAction": "84",
			"buildingId": "5",
			"id": "160",
			"inputs": [
				{
					"productId": "61",
					"unitsPerSR": "14000"
				},
				{
					"productId": "74",
					"unitsPerSR": "120000"
				},
				{
					"productId": "83",
					"unitsPerSR": "3"
				},
				{
					"productId": "84",
					"unitsPerSR": "2"
				},
				{
					"productId": "90",
					"unitsPerSR": "48000"
				},
				{
					"productId": "100",
					"unitsPerSR": "140000"
				},
				{
					"productId": "162",
					"unitsPerSR": "95000"
				}
			],
			"mAdalianHoursPerSR": "1020",
			"name": "Silicon Wafer CPU Photolithography, Ball Bonding, and Encapsulation",
			"outputs": [
				{
					"productId": "174",
					"unitsPerSR": "101500"
				}
			]
		},
		{
			"bAdalianHoursPerAction": "6",
			"buildingId": "5",
			"id": "161",
			"inputs": [
				{
					"productId": "154",
					"unitsPerSR": "1"
				},
				{
					"productId": "155",
					"unitsPerSR": "1"
				},
				{
					"productId": "180",
					"unitsPerSR": "18"
				}
			],
			"mAdalianHoursPerSR": "0.0333",
			"name": "Core Drill Assembly",
			"outputs": [
				{
					"productId": "175",
					"unitsPerSR": "1"
				}
			]
		},
		{
			"bAdalianHoursPerAction": "18",
			"buildingId": "3",
			"id": "162",
			"inputs": [
				{
					"productId": "112",
					"unitsPerSR": "120"
				},
				{
					"productId": "159",
					"unitsPerSR": "501"
				}
			],
			"mAdalianHoursPerSR": "0.069",
			"name": "Neodymium Trichloride Vacuum Calciothermic Reduction",
			"outputs": [
				{
					"productId": "78",
					"unitsPerSR": "333"
				},
				{
					"productId": "176",
					"unitsPerSR": "288"
				}
			]
		},
		{
			"bAdalianHoursPerAction": "22",
			"buildingId": "3",
			"id": "163",
			"inputs": [
				{
					"productId": "45",
					"unitsPerSR": "58"
				},
				{
					"productId": "159",
					"unitsPerSR": "251"
				}
			],
			"mAdalianHoursPerSR": "0.309",
			"name": "Neodymium Trichloride Molten Salt Electrolysis",
			"outputs": [
				{
					"productId": "76",
					"unitsPerSR": "142"
				},
				{
					"productId": "176",
					"unitsPerSR": "144"
				}
			]
		},
		{
			"bAdalianHoursPerAction": "14",
			"buildingId": "3",
			"id": "165",
			"inputs": [
				{
					"productId": "111",
					"unitsPerSR": "54"
				},
				{
					"productId": "161",
					"unitsPerSR": "152"
				}
			],
			"mAdalianHoursPerSR": "0.0172",
			"name": "Chromia Aluminothermic Reduction",
			"outputs": [
				{
					"productId": "88",
					"unitsPerSR": "102"
				},
				{
					"productId": "178",
					"unitsPerSR": "104"
				}
			]
		},
		{
			"bAdalianHoursPerAction": "16",
			"buildingId": "3",
			"id": "166",
			"inputs": [
				{
					"productId": "82",
					"unitsPerSR": "80"
				},
				{
					"productId": "163",
					"unitsPerSR": "270"
				}
			],
			"mAdalianHoursPerSR": "0.0014",
			"name": "Uranium Dioxide Oxidation",
			"outputs": [
				{
					"productId": "24",
					"unitsPerSR": "36"
				},
				{
					"productId": "179",
					"unitsPerSR": "314"
				}
			]
		},
		{
			"bAdalianHoursPerAction": "36",
			"buildingId": "3",
			"id": "167",
			"inputs": [
				{
					"productId": "2",
					"unitsPerSR": "4"
				},
				{
					"productId": "54",
					"unitsPerSR": "252"
				},
				{
					"productId": "110",
					"unitsPerSR": "107"
				},
				{
					"productId": "114",
					"unitsPerSR": "424320"
				}
			],
			"mAdalianHoursPerSR": "23.6",
			"name": "Leached Coffinite Froth Flotation, Solvent Extraction, and Precipitation",
			"outputs": [
				{
					"productId": "3",
					"unitsPerSR": "34"
				},
				{
					"productId": "24",
					"unitsPerSR": "72"
				},
				{
					"productId": "81",
					"unitsPerSR": "73"
				},
				{
					"productId": "104",
					"unitsPerSR": "195"
				}
			]
		},
		{
			"bAdalianHoursPerAction": "80",
			"buildingId": "5",
			"id": "168",
			"inputs": [
				{
					"productId": "88",
					"unitsPerSR": "50981"
				},
				{
					"productId": "137",
					"unitsPerSR": "1009"
				},
				{
					"productId": "138",
					"unitsPerSR": "67066"
				}
			],
			"mAdalianHoursPerSR": "541",
			"name": "Nd:YAG Czochralski Process",
			"outputs": [
				{
					"productId": "181",
					"unitsPerSR": "119056"
				}
			]
		},
		{
			"bAdalianHoursPerAction": "26",
			"buildingId": "3",
			"id": "169",
			"inputs": [
				{
					"productId": "31",
					"unitsPerSR": "4"
				},
				{
					"productId": "178",
					"unitsPerSR": "1"
				}
			],
			"mAdalianHoursPerSR": "0.0002",
			"name": "Nichrome Alloying",
			"outputs": [
				{
					"productId": "182",
					"unitsPerSR": "5"
				}
			]
		},
		{
			"bAdalianHoursPerAction": "24",
			"buildingId": "5",
			"id": "170",
			"inputs": [
				{
					"productId": "29",
					"unitsPerSR": "72"
				},
				{
					"productId": "134",
					"unitsPerSR": "1"
				},
				{
					"productId": "176",
					"unitsPerSR": "27"
				}
			],
			"mAdalianHoursPerSR": "0.0333",
			"name": "Magnet Sintering and Magnetization",
			"outputs": [
				{
					"productId": "183",
					"unitsPerSR": "100"
				}
			]
		},
		{
			"bAdalianHoursPerAction": "36",
			"buildingId": "3",
			"id": "171",
			"inputs": [
				{
					"productId": "116",
					"unitsPerSR": "38"
				},
				{
					"productId": "179",
					"unitsPerSR": "314"
				}
			],
			"mAdalianHoursPerSR": "0.0004222222222",
			"name": "Uranium Tetrafluoride Fluoridation",
			"outputs": [
				{
					"productId": "184",
					"unitsPerSR": "352"
				}
			]
		},
		{
			"bAdalianHoursPerAction": "120",
			"buildingId": "3",
			"id": "172",
			"inputs": [
				{
					"productId": "184",
					"unitsPerSR": "530694"
				}
			],
			"mAdalianHoursPerSR": "26.7",
			"name": "Uranium Hexafluoride Centrifuge Cascade Enrichment",
			"outputs": [
				{
					"productId": "185",
					"unitsPerSR": "2672"
				}
			]
		},
		{
			"bAdalianHoursPerAction": "50",
			"buildingId": "5",
			"id": "173",
			"inputs": [
				{
					"productId": "99",
					"unitsPerSR": "1"
				},
				{
					"productId": "111",
					"unitsPerSR": "8"
				},
				{
					"productId": "120",
					"unitsPerSR": "1"
				},
				{
					"productId": "181",
					"unitsPerSR": "10"
				}
			],
			"mAdalianHoursPerSR": "0.571",
			"name": "Nd:YAG Laser Assembly",
			"outputs": [
				{
					"productId": "186",
					"unitsPerSR": "20"
				}
			]
		},
		{
			"bAdalianHoursPerAction": "44",
			"buildingId": "5",
			"id": "174",
			"inputs": [
				{
					"productId": "74",
					"unitsPerSR": "2500"
				},
				{
					"productId": "97",
					"unitsPerSR": "12500"
				},
				{
					"productId": "182",
					"unitsPerSR": "1"
				}
			],
			"mAdalianHoursPerSR": "83.3",
			"name": "Thin-film Resistor Sputtering and Laser-trimming",
			"outputs": [
				{
					"productId": "187",
					"unitsPerSR": "15000"
				}
			]
		},
		{
			"bAdalianHoursPerAction": "50",
			"buildingId": "3",
			"id": "175",
			"inputs": [
				{
					"productId": "75",
					"unitsPerSR": "73"
				},
				{
					"productId": "185",
					"unitsPerSR": "349"
				}
			],
			"mAdalianHoursPerSR": "0.211",
			"name": "HEUF6 Magnesiothermic Reduction and Fine Division",
			"outputs": [
				{
					"productId": "188",
					"unitsPerSR": "235"
				}
			]
		},
		{
			"bAdalianHoursPerAction": "24",
			"buildingId": "4",
			"id": "176",
			"inputs": [
				{
					"productId": "3",
					"unitsPerSR": "550"
				},
				{
					"productId": "6",
					"unitsPerSR": "5900"
				},
				{
					"productId": "24",
					"unitsPerSR": "1300"
				},
				{
					"productId": "28",
					"unitsPerSR": "150"
				},
				{
					"productId": "35",
					"unitsPerSR": "170"
				},
				{
					"productId": "36",
					"unitsPerSR": "70"
				},
				{
					"productId": "46",
					"unitsPerSR": "110"
				}
			],
			"mAdalianHoursPerSR": "85",
			"name": "Spirulina and Chlorella Algae Growing",
			"outputs": [
				{
					"productId": "64",
					"unitsPerSR": "4000"
				}
			]
		},
		{
			"bAdalianHoursPerAction": "24",
			"buildingId": "4",
			"id": "177",
			"inputs": [
				{
					"productId": "8",
					"unitsPerSR": "280"
				},
				{
					"productId": "23",
					"unitsPerSR": "320"
				},
				{
					"productId": "36",
					"unitsPerSR": "740"
				}
			],
			"mAdalianHoursPerSR": "15",
			"name": "PEDOT Bacteria Culturing",
			"outputs": [
				{
					"productId": "200",
					"unitsPerSR": "410"
				}
			]
		},
		{
			"bAdalianHoursPerAction": "22",
			"buildingId": "4",
			"id": "178",
			"inputs": [
				{
					"productId": "8",
					"unitsPerSR": "430"
				},
				{
					"productId": "23",
					"unitsPerSR": "690"
				}
			],
			"mAdalianHoursPerSR": "26",
			"name": "BPA Bacteria Culturing",
			"outputs": [
				{
					"productId": "108",
					"unitsPerSR": "410"
				}
			]
		},
		{
			"bAdalianHoursPerAction": "8",
			"buildingId": "3",
			"id": "179",
			"inputs": [
				{
					"productId": "6",
					"unitsPerSR": "112"
				},
				{
					"productId": "90",
					"unitsPerSR": "44"
				}
			],
			"mAdalianHoursPerSR": "0.0002341666667",
			"name": "Potassium Hydroxide Carbonation",
			"outputs": [
				{
					"productId": "24",
					"unitsPerSR": "18"
				},
				{
					"productId": "192",
					"unitsPerSR": "138"
				}
			]
		},
		{
			"bAdalianHoursPerAction": "32",
			"buildingId": "4",
			"id": "180",
			"inputs": [
				{
					"productId": "8",
					"unitsPerSR": "410"
				},
				{
					"productId": "23",
					"unitsPerSR": "670"
				}
			],
			"mAdalianHoursPerSR": "30",
			"name": "Novolak Bacteria Culturing",
			"outputs": [
				{
					"productId": "140",
					"unitsPerSR": "410"
				}
			]
		},
		{
			"bAdalianHoursPerAction": "24",
			"buildingId": "3",
			"id": "181",
			"inputs": [
				{
					"productId": "29",
					"unitsPerSR": "1"
				},
				{
					"productId": "178",
					"unitsPerSR": "1"
				}
			],
			"mAdalianHoursPerSR": "0.00009416666667",
			"name": "Ferrochromium Alloying",
			"outputs": [
				{
					"productId": "95",
					"unitsPerSR": "2"
				}
			]
		},
		{
			"bAdalianHoursPerAction": "10",
			"buildingId": "3",
			"id": "182",
			"inputs": [
				{
					"productId": "82",
					"unitsPerSR": "40"
				},
				{
					"productId": "192",
					"unitsPerSR": "138"
				}
			],
			"mAdalianHoursPerSR": "0.0001780555556",
			"name": "Potassium Carbonate Fluoridation",
			"outputs": [
				{
					"productId": "6",
					"unitsPerSR": "44"
				},
				{
					"productId": "24",
					"unitsPerSR": "18"
				},
				{
					"productId": "195",
					"unitsPerSR": "116"
				}
			]
		},
		{
			"bAdalianHoursPerAction": "36",
			"buildingId": "3",
			"id": "183",
			"inputs": [
				{
					"productId": "82",
					"unitsPerSR": "520"
				},
				{
					"productId": "191",
					"unitsPerSR": "1416"
				}
			],
			"mAdalianHoursPerSR": "0.121",
			"name": "Rhabdite Slag Acid Leaching",
			"outputs": [
				{
					"productId": "24",
					"unitsPerSR": "180"
				},
				{
					"productId": "193",
					"unitsPerSR": "1048"
				}
			]
		},
		{
			"bAdalianHoursPerAction": "24",
			"buildingId": "3",
			"id": "184",
			"inputs": [
				{
					"productId": "193",
					"unitsPerSR": "544"
				},
				{
					"productId": "195",
					"unitsPerSR": "232"
				}
			],
			"mAdalianHoursPerSR": "0.194",
			"name": "Tantalate-Niobate Liquid-Liquid Extraction and Redox",
			"outputs": [
				{
					"productId": "82",
					"unitsPerSR": "80"
				},
				{
					"productId": "196",
					"unitsPerSR": "392"
				}
			]
		},
		{
			"bAdalianHoursPerAction": "6",
			"buildingId": "3",
			"id": "185",
			"inputs": [
				{
					"productId": "6",
					"unitsPerSR": "11"
				}
			],
			"mAdalianHoursPerSR": "0.0044",
			"name": "Carbon Dioxide Ferrocatalysis",
			"outputs": [
				{
					"productId": "7",
					"unitsPerSR": "7"
				},
				{
					"productId": "23",
					"unitsPerSR": "4"
				}
			]
		},
		{
			"bAdalianHoursPerAction": "30",
			"buildingId": "3",
			"id": "186",
			"inputs": [
				{
					"productId": "45",
					"unitsPerSR": "292"
				},
				{
					"productId": "196",
					"unitsPerSR": "392"
				}
			],
			"mAdalianHoursPerSR": "0.137",
			"name": "Potassium Heptafluorotantalate Sodiothermic Reduction",
			"outputs": [
				{
					"productId": "76",
					"unitsPerSR": "177"
				},
				{
					"productId": "195",
					"unitsPerSR": "116"
				},
				{
					"productId": "199",
					"unitsPerSR": "181"
				}
			]
		},
		{
			"bAdalianHoursPerAction": "20",
			"buildingId": "3",
			"id": "187",
			"inputs": [
				{
					"productId": "19",
					"unitsPerSR": "2556"
				},
				{
					"productId": "190",
					"unitsPerSR": "24076"
				}
			],
			"mAdalianHoursPerSR": "0.38",
			"name": "Rhabdite Carbothermic Reduction",
			"outputs": [
				{
					"productId": "6",
					"unitsPerSR": "9372"
				},
				{
					"productId": "95",
					"unitsPerSR": "16153"
				},
				{
					"productId": "191",
					"unitsPerSR": "1107"
				}
			]
		},
		{
			"bAdalianHoursPerAction": "72",
			"buildingId": "5",
			"id": "188",
			"inputs": [
				{
					"productId": "19",
					"unitsPerSR": "1"
				},
				{
					"productId": "55",
					"unitsPerSR": "2900"
				},
				{
					"productId": "60",
					"unitsPerSR": "19"
				},
				{
					"productId": "136",
					"unitsPerSR": "1000"
				},
				{
					"productId": "199",
					"unitsPerSR": "8000"
				},
				{
					"productId": "200",
					"unitsPerSR": "1000"
				}
			],
			"mAdalianHoursPerSR": "62.5",
			"name": "Polymer Tantalum Capacitor Assembly",
			"outputs": [
				{
					"productId": "201",
					"unitsPerSR": "10000"
				}
			]
		},
		{
			"bAdalianHoursPerAction": "48",
			"buildingId": "5",
			"id": "189",
			"inputs": [
				{
					"productId": "119",
					"unitsPerSR": "1"
				},
				{
					"productId": "153",
					"unitsPerSR": "2"
				},
				{
					"productId": "187",
					"unitsPerSR": "1"
				},
				{
					"productId": "201",
					"unitsPerSR": "1"
				}
			],
			"mAdalianHoursPerSR": "0.00125",
			"name": "Surface Mount Device Reel Assembly",
			"outputs": [
				{
					"productId": "202",
					"unitsPerSR": "1"
				}
			]
		},
		{
			"bAdalianHoursPerAction": "80",
			"buildingId": "5",
			"id": "190",
			"inputs": [
				{
					"productId": "67",
					"unitsPerSR": "5"
				},
				{
					"productId": "152",
					"unitsPerSR": "10"
				},
				{
					"productId": "202",
					"unitsPerSR": "1"
				}
			],
			"mAdalianHoursPerSR": "0.0133",
			"name": "Pick-and-place Board Population",
			"outputs": [
				{
					"productId": "203",
					"unitsPerSR": "20"
				}
			]
		},
		{
			"bAdalianHoursPerAction": "40",
			"buildingId": "5",
			"id": "191",
			"inputs": [
				{
					"productId": "99",
					"unitsPerSR": "15"
				},
				{
					"productId": "111",
					"unitsPerSR": "5"
				},
				{
					"productId": "118",
					"unitsPerSR": "9"
				},
				{
					"productId": "203",
					"unitsPerSR": "1"
				}
			],
			"mAdalianHoursPerSR": "0.05",
			"name": "Motor Stator Assembly",
			"outputs": [
				{
					"productId": "204",
					"unitsPerSR": "10"
				}
			]
		},
		{
			"bAdalianHoursPerAction": "30",
			"buildingId": "5",
			"id": "192",
			"inputs": [
				{
					"productId": "111",
					"unitsPerSR": "5"
				},
				{
					"productId": "132",
					"unitsPerSR": "1"
				},
				{
					"productId": "183",
					"unitsPerSR": "9"
				}
			],
			"mAdalianHoursPerSR": "0.0125",
			"name": "Motor Rotor Assembly",
			"outputs": [
				{
					"productId": "205",
					"unitsPerSR": "5"
				}
			]
		},
		{
			"bAdalianHoursPerAction": "24",
			"buildingId": "5",
			"id": "193",
			"inputs": [
				{
					"productId": "204",
					"unitsPerSR": "1"
				},
				{
					"productId": "205",
					"unitsPerSR": "1"
				}
			],
			"mAdalianHoursPerSR": "0.002",
			"name": "Brushless Motor Assembly",
			"outputs": [
				{
					"productId": "206",
					"unitsPerSR": "1"
				}
			]
		},
		{
			"bAdalianHoursPerAction": "80",
			"buildingId": "6",
			"id": "194",
			"inputs": [
				{
					"productId": "69",
					"unitsPerSR": "500"
				},
				{
					"productId": "70",
					"unitsPerSR": "300"
				},
				{
					"productId": "99",
					"unitsPerSR": "4"
				},
				{
					"productId": "206",
					"unitsPerSR": "2"
				}
			],
			"mAdalianHoursPerSR": "8",
			"name": "Landing Leg Assembly",
			"outputs": [
				{
					"productId": "207",
					"unitsPerSR": "1"
				}
			]
		},
		{
			"bAdalianHoursPerAction": "30",
			"buildingId": "6",
			"id": "195",
			"inputs": [
				{
					"productId": "70",
					"unitsPerSR": "80"
				},
				{
					"productId": "71",
					"unitsPerSR": "40"
				},
				{
					"productId": "99",
					"unitsPerSR": "6"
				},
				{
					"productId": "206",
					"unitsPerSR": "3"
				}
			],
			"mAdalianHoursPerSR": "2",
			"name": "Landing Auger Assembly",
			"outputs": [
				{
					"productId": "208",
					"unitsPerSR": "1"
				}
			]
		},
		{
			"bAdalianHoursPerAction": "20",
			"buildingId": "5",
			"id": "196",
			"inputs": [
				{
					"productId": "111",
					"unitsPerSR": "9"
				},
				{
					"productId": "132",
					"unitsPerSR": "1"
				},
				{
					"productId": "206",
					"unitsPerSR": "5"
				}
			],
			"mAdalianHoursPerSR": "0.0333",
			"name": "Pump Assembly",
			"outputs": [
				{
					"productId": "209",
					"unitsPerSR": "5"
				}
			]
		},
		{
			"bAdalianHoursPerAction": "36",
			"buildingId": "5",
			"id": "197",
			"inputs": [
				{
					"productId": "99",
					"unitsPerSR": "30"
				},
				{
					"productId": "156",
					"unitsPerSR": "10"
				},
				{
					"productId": "203",
					"unitsPerSR": "1"
				}
			],
			"mAdalianHoursPerSR": "0.667",
			"name": "Antenna Assembly",
			"outputs": [
				{
					"productId": "210",
					"unitsPerSR": "10"
				}
			]
		},
		{
			"bAdalianHoursPerAction": "60",
			"buildingId": "5",
			"id": "198",
			"inputs": [
				{
					"productId": "68",
					"unitsPerSR": "17"
				},
				{
					"productId": "186",
					"unitsPerSR": "2"
				},
				{
					"productId": "203",
					"unitsPerSR": "1"
				}
			],
			"mAdalianHoursPerSR": "0.833",
			"name": "Fiber Optic Gyroscope Assembly",
			"outputs": [
				{
					"productId": "211",
					"unitsPerSR": "10"
				}
			]
		},
		{
			"bAdalianHoursPerAction": "40",
			"buildingId": "5",
			"id": "199",
			"inputs": [
				{
					"productId": "131",
					"unitsPerSR": "92"
				},
				{
					"productId": "173",
					"unitsPerSR": "1"
				},
				{
					"productId": "174",
					"unitsPerSR": "2"
				},
				{
					"productId": "203",
					"unitsPerSR": "5"
				}
			],
			"mAdalianHoursPerSR": "5",
			"name": "Star Tracker Assembly",
			"outputs": [
				{
					"productId": "212",
					"unitsPerSR": "50"
				}
			]
		},
		{
			"bAdalianHoursPerAction": "20",
			"buildingId": "5",
			"id": "200",
			"inputs": [
				{
					"productId": "174",
					"unitsPerSR": "2"
				},
				{
					"productId": "203",
					"unitsPerSR": "5"
				}
			],
			"mAdalianHoursPerSR": "2",
			"name": "Computer Assembly",
			"outputs": [
				{
					"productId": "213",
					"unitsPerSR": "50"
				}
			]
		},
		{
			"bAdalianHoursPerAction": "72",
			"buildingId": "5",
			"id": "201",
			"inputs": [
				{
					"productId": "111",
					"unitsPerSR": "1475"
				},
				{
					"productId": "132",
					"unitsPerSR": "4"
				},
				{
					"productId": "203",
					"unitsPerSR": "1"
				},
				{
					"productId": "206",
					"unitsPerSR": "20"
				}
			],
			"mAdalianHoursPerSR": "5",
			"name": "Control Moment Gyroscope Assembly",
			"outputs": [
				{
					"productId": "214",
					"unitsPerSR": "10"
				}
			]
		},
		{
			"bAdalianHoursPerAction": "48",
			"buildingId": "5",
			"id": "202",
			"inputs": [
				{
					"productId": "69",
					"unitsPerSR": "250"
				},
				{
					"productId": "74",
					"unitsPerSR": "19"
				},
				{
					"productId": "206",
					"unitsPerSR": "5"
				},
				{
					"productId": "213",
					"unitsPerSR": "1"
				}
			],
			"mAdalianHoursPerSR": "0.0833",
			"name": "Robotic Arm Assembly",
			"outputs": [
				{
					"productId": "215",
					"unitsPerSR": "1"
				}
			]
		},
		{
			"bAdalianHoursPerAction": "4",
			"buildingId": "3",
			"id": "203",
			"inputs": [
				{
					"productId": "189",
					"unitsPerSR": "156"
				}
			],
			"mAdalianHoursPerSR": "0.00312",
			"name": "Feldspar Aluminium Hydroxide Calcination",
			"outputs": [
				{
					"productId": "24",
					"unitsPerSR": "54"
				},
				{
					"productId": "88",
					"unitsPerSR": "102"
				}
			]
		},
		{
			"bAdalianHoursPerAction": "20",
			"buildingId": "3",
			"id": "204",
			"inputs": [
				{
					"productId": "23",
					"unitsPerSR": "5280"
				},
				{
					"productId": "77",
					"unitsPerSR": "8267"
				},
				{
					"productId": "95",
					"unitsPerSR": "8076"
				}
			],
			"mAdalianHoursPerSR": "1.51",
			"name": "Ferrochromium Roasting and Hot Base Leaching",
			"outputs": [
				{
					"productId": "6",
					"unitsPerSR": "3432"
				},
				{
					"productId": "63",
					"unitsPerSR": "5557"
				},
				{
					"productId": "113",
					"unitsPerSR": "12634"
				}
			]
		},
		{
			"bAdalianHoursPerAction": "12",
			"buildingId": "3",
			"id": "205",
			"inputs": [
				{
					"productId": "217",
					"unitsPerSR": "69"
				}
			],
			"mAdalianHoursPerSR": "0.00076",
			"name": "Beryllium Carbonate Calcination",
			"outputs": [
				{
					"productId": "6",
					"unitsPerSR": "44"
				},
				{
					"productId": "218",
					"unitsPerSR": "25"
				}
			]
		},
		{
			"bAdalianHoursPerAction": "60",
			"buildingId": "5",
			"id": "206",
			"inputs": [
				{
					"productId": "218",
					"unitsPerSR": "1"
				}
			],
			"mAdalianHoursPerSR": "0.0005561111111",
			"name": "Beryllia Forming and Sintering",
			"outputs": [
				{
					"productId": "219",
					"unitsPerSR": "1"
				}
			]
		},
		{
			"bAdalianHoursPerAction": "96",
			"buildingId": "5",
			"id": "207",
			"inputs": [
				{
					"productId": "61",
					"unitsPerSR": "2250"
				},
				{
					"productId": "74",
					"unitsPerSR": "37000"
				},
				{
					"productId": "83",
					"unitsPerSR": "1"
				},
				{
					"productId": "84",
					"unitsPerSR": "2"
				},
				{
					"productId": "90",
					"unitsPerSR": "31000"
				},
				{
					"productId": "100",
					"unitsPerSR": "90000"
				},
				{
					"productId": "162",
					"unitsPerSR": "61000"
				}
			],
			"mAdalianHoursPerSR": "625",
			"name": "Silicon Wafer CCD Photolithography, Ball Bonding, and Packaging",
			"outputs": [
				{
					"productId": "173",
					"unitsPerSR": "62500"
				}
			]
		},
		{
			"bAdalianHoursPerAction": "70",
			"buildingId": "6",
			"id": "208",
			"inputs": [
				{
					"productId": "151",
					"unitsPerSR": "10"
				},
				{
					"productId": "172",
					"unitsPerSR": "30"
				}
			],
			"mAdalianHoursPerSR": "7",
			"name": "Heat Exchanger Assembly",
			"outputs": [
				{
					"productId": "221",
					"unitsPerSR": "1"
				}
			]
		},
		{
			"bAdalianHoursPerAction": "160",
			"buildingId": "6",
			"id": "209",
			"inputs": [
				{
					"productId": "97",
					"unitsPerSR": "400"
				},
				{
					"productId": "121",
					"unitsPerSR": "5"
				},
				{
					"productId": "132",
					"unitsPerSR": "2"
				},
				{
					"productId": "151",
					"unitsPerSR": "2000"
				},
				{
					"productId": "172",
					"unitsPerSR": "500"
				}
			],
			"mAdalianHoursPerSR": "200",
			"name": "Turbopump Assembly",
			"outputs": [
				{
					"productId": "222",
					"unitsPerSR": "10"
				}
			]
		},
		{
			"bAdalianHoursPerAction": "60",
			"buildingId": "5",
			"id": "210",
			"inputs": [
				{
					"productId": "61",
					"unitsPerSR": "308"
				},
				{
					"productId": "83",
					"unitsPerSR": "7"
				},
				{
					"productId": "84",
					"unitsPerSR": "22"
				},
				{
					"productId": "100",
					"unitsPerSR": "3080"
				},
				{
					"productId": "111",
					"unitsPerSR": "61600"
				}
			],
			"mAdalianHoursPerSR": "1630",
			"name": "Laser Diode Doping, Amorphization, and Assembly",
			"outputs": [
				{
					"productId": "120",
					"unitsPerSR": "65000"
				}
			]
		},
		{
			"bAdalianHoursPerAction": "114",
			"buildingId": "6",
			"id": "211",
			"inputs": [
				{
					"productId": "99",
					"unitsPerSR": "2"
				},
				{
					"productId": "134",
					"unitsPerSR": "140"
				},
				{
					"productId": "151",
					"unitsPerSR": "32"
				},
				{
					"productId": "172",
					"unitsPerSR": "14"
				},
				{
					"productId": "182",
					"unitsPerSR": "2"
				}
			],
			"mAdalianHoursPerSR": "16",
			"name": "Separator Centrifuge Assembly",
			"outputs": [
				{
					"productId": "224",
					"unitsPerSR": "1"
				}
			]
		},
		{
			"bAdalianHoursPerAction": "80",
			"buildingId": "6",
			"id": "212",
			"inputs": [
				{
					"productId": "121",
					"unitsPerSR": "3"
				},
				{
					"productId": "134",
					"unitsPerSR": "140"
				},
				{
					"productId": "171",
					"unitsPerSR": "20"
				},
				{
					"productId": "172",
					"unitsPerSR": "4"
				},
				{
					"productId": "188",
					"unitsPerSR": "33"
				}
			],
			"mAdalianHoursPerSR": "12",
			"name": "Fuel Make-up Tank Assembly",
			"outputs": [
				{
					"productId": "225",
					"unitsPerSR": "2"
				}
			]
		},
		{
			"bAdalianHoursPerAction": "40",
			"buildingId": "6",
			"id": "213",
			"inputs": [
				{
					"productId": "121",
					"unitsPerSR": "1"
				},
				{
					"productId": "171",
					"unitsPerSR": "10"
				},
				{
					"productId": "172",
					"unitsPerSR": "2"
				},
				{
					"productId": "220",
					"unitsPerSR": "487"
				}
			],
			"mAdalianHoursPerSR": "6",
			"name": "Neon Make-up Tank Assembly",
			"outputs": [
				{
					"productId": "226",
					"unitsPerSR": "2"
				}
			]
		},
		{
			"bAdalianHoursPerAction": "100",
			"buildingId": "6",
			"id": "214",
			"inputs": [
				{
					"productId": "19",
					"unitsPerSR": "54"
				},
				{
					"productId": "172",
					"unitsPerSR": "2"
				},
				{
					"productId": "219",
					"unitsPerSR": "74"
				}
			],
			"mAdalianHoursPerSR": "16",
			"name": "Lightbulb End Moderators Assembly",
			"outputs": [
				{
					"productId": "227",
					"unitsPerSR": "1"
				}
			]
		},
		{
			"bAdalianHoursPerAction": "16",
			"buildingId": "5",
			"id": "215",
			"inputs": [
				{
					"productId": "111",
					"unitsPerSR": "3"
				}
			],
			"mAdalianHoursPerSR": "0.004",
			"name": "Cold Gas Torque Thruster Printing",
			"outputs": [
				{
					"productId": "127",
					"unitsPerSR": "1"
				}
			]
		},
		{
			"bAdalianHoursPerAction": "120",
			"buildingId": "6",
			"id": "216",
			"inputs": [
				{
					"productId": "41",
					"unitsPerSR": "50"
				}
			],
			"mAdalianHoursPerSR": "16",
			"name": "Fused Quartz Lightbulb Additive/Subtractive Assembly",
			"outputs": [
				{
					"productId": "229",
					"unitsPerSR": "1"
				}
			]
		},
		{
			"bAdalianHoursPerAction": "250",
			"buildingId": "6",
			"id": "217",
			"inputs": [
				{
					"productId": "99",
					"unitsPerSR": "50"
				},
				{
					"productId": "121",
					"unitsPerSR": "35"
				},
				{
					"productId": "209",
					"unitsPerSR": "7"
				},
				{
					"productId": "213",
					"unitsPerSR": "1"
				},
				{
					"productId": "221",
					"unitsPerSR": "8"
				},
				{
					"productId": "222",
					"unitsPerSR": "1"
				},
				{
					"productId": "224",
					"unitsPerSR": "1"
				},
				{
					"productId": "225",
					"unitsPerSR": "3"
				},
				{
					"productId": "226",
					"unitsPerSR": "3"
				}
			],
			"mAdalianHoursPerSR": "56",
			"name": "Reactor Plumbing Assembly Squared",
			"outputs": [
				{
					"productId": "230",
					"unitsPerSR": "1"
				}
			]
		},
		{
			"bAdalianHoursPerAction": "240",
			"buildingId": "6",
			"id": "218",
			"inputs": [
				{
					"productId": "19",
					"unitsPerSR": "12000"
				},
				{
					"productId": "151",
					"unitsPerSR": "200"
				},
				{
					"productId": "219",
					"unitsPerSR": "6500"
				}
			],
			"mAdalianHoursPerSR": "48",
			"name": "Flow Divider Moderator Assembly",
			"outputs": [
				{
					"productId": "231",
					"unitsPerSR": "1"
				}
			]
		},
		{
			"bAdalianHoursPerAction": "88",
			"buildingId": "6",
			"id": "219",
			"inputs": [
				{
					"productId": "227",
					"unitsPerSR": "1"
				},
				{
					"productId": "229",
					"unitsPerSR": "1"
				}
			],
			"mAdalianHoursPerSR": "13",
			"name": "Nuclear Lightbulb Assembly",
			"outputs": [
				{
					"productId": "232",
					"unitsPerSR": "1"
				}
			]
		},
		{
			"bAdalianHoursPerAction": "180",
			"buildingId": "6",
			"id": "220",
			"inputs": [
				{
					"productId": "42",
					"unitsPerSR": "1000"
				},
				{
					"productId": "69",
					"unitsPerSR": "1000"
				},
				{
					"productId": "128",
					"unitsPerSR": "2000"
				},
				{
					"productId": "136",
					"unitsPerSR": "1500"
				},
				{
					"productId": "171",
					"unitsPerSR": "450"
				},
				{
					"productId": "172",
					"unitsPerSR": "50"
				}
			],
			"mAdalianHoursPerSR": "54",
			"name": "Reactor Shell Assembly",
			"outputs": [
				{
					"productId": "233",
					"unitsPerSR": "1"
				}
			]
		},
		{
			"bAdalianHoursPerAction": "360",
			"buildingId": "6",
			"id": "221",
			"inputs": [
				{
					"productId": "144",
					"unitsPerSR": "7"
				},
				{
					"productId": "230",
					"unitsPerSR": "1"
				},
				{
					"productId": "231",
					"unitsPerSR": "1"
				},
				{
					"productId": "232",
					"unitsPerSR": "7"
				},
				{
					"productId": "233",
					"unitsPerSR": "1"
				}
			],
			"mAdalianHoursPerSR": "120",
			"name": "Closed-cycle Gas Core Nuclear Reactor Engine Assembly",
			"outputs": [
				{
					"productId": "234",
					"unitsPerSR": "1"
				}
			]
		},
		{
			"bAdalianHoursPerAction": "100",
			"buildingId": "6",
			"id": "222",
			"inputs": [
				{
					"productId": "23",
					"unitsPerSR": "60"
				},
				{
					"productId": "41",
					"unitsPerSR": "50"
				},
				{
					"productId": "149",
					"unitsPerSR": "1"
				},
				{
					"productId": "180",
					"unitsPerSR": "240"
				}
			],
			"mAdalianHoursPerSR": "21",
			"name": "Habitation Module Assembly",
			"outputs": [
				{
					"productId": "235",
					"unitsPerSR": "1"
				}
			]
		},
		{
			"bAdalianHoursPerAction": "110",
			"buildingId": "6",
			"id": "223",
			"inputs": [
				{
					"productId": "121",
					"unitsPerSR": "10"
				},
				{
					"productId": "126",
					"unitsPerSR": "12"
				},
				{
					"productId": "130",
					"unitsPerSR": "74"
				},
				{
					"productId": "172",
					"unitsPerSR": "30"
				},
				{
					"productId": "180",
					"unitsPerSR": "1480"
				}
			],
			"mAdalianHoursPerSR": "15",
			"name": "Mobility Module Assembly",
			"outputs": [
				{
					"productId": "236",
					"unitsPerSR": "1"
				}
			]
		},
		{
			"bAdalianHoursPerAction": "144",
			"buildingId": "6",
			"id": "224",
			"inputs": [
				{
					"productId": "99",
					"unitsPerSR": "9"
				},
				{
					"productId": "121",
					"unitsPerSR": "20"
				},
				{
					"productId": "171",
					"unitsPerSR": "2490"
				},
				{
					"productId": "172",
					"unitsPerSR": "1000"
				},
				{
					"productId": "209",
					"unitsPerSR": "10"
				},
				{
					"productId": "213",
					"unitsPerSR": "1"
				}
			],
			"mAdalianHoursPerSR": "10",
			"name": "Fluids Automation Module Assembly",
			"outputs": [
				{
					"productId": "237",
					"unitsPerSR": "1"
				}
			]
		},
		{
			"bAdalianHoursPerAction": "160",
			"buildingId": "6",
			"id": "225",
			"inputs": [
				{
					"productId": "69",
					"unitsPerSR": "2000"
				},
				{
					"productId": "70",
					"unitsPerSR": "910"
				},
				{
					"productId": "99",
					"unitsPerSR": "10"
				},
				{
					"productId": "132",
					"unitsPerSR": "20"
				},
				{
					"productId": "206",
					"unitsPerSR": "10"
				},
				{
					"productId": "215",
					"unitsPerSR": "2"
				}
			],
			"mAdalianHoursPerSR": "12",
			"name": "Solids Automation Module Assembly",
			"outputs": [
				{
					"productId": "238",
					"unitsPerSR": "1"
				}
			]
		},
		{
			"bAdalianHoursPerAction": "100",
			"buildingId": "6",
			"id": "226",
			"inputs": [
				{
					"productId": "207",
					"unitsPerSR": "1"
				},
				{
					"productId": "208",
					"unitsPerSR": "1"
				}
			],
			"mAdalianHoursPerSR": "8",
			"name": "Terrain Interface Module Assembly",
			"outputs": [
				{
					"productId": "239",
					"unitsPerSR": "1"
				}
			]
		},
		{
			"bAdalianHoursPerAction": "180",
			"buildingId": "6",
			"id": "227",
			"inputs": [
				{
					"productId": "99",
					"unitsPerSR": "414"
				},
				{
					"productId": "210",
					"unitsPerSR": "1"
				},
				{
					"productId": "211",
					"unitsPerSR": "3"
				},
				{
					"productId": "212",
					"unitsPerSR": "1"
				},
				{
					"productId": "213",
					"unitsPerSR": "3"
				}
			],
			"mAdalianHoursPerSR": "12",
			"name": "Avionics Module Assembly",
			"outputs": [
				{
					"productId": "240",
					"unitsPerSR": "1"
				}
			]
		},
		{
			"bAdalianHoursPerAction": "240",
			"buildingId": "6",
			"id": "228",
			"inputs": [
				{
					"productId": "24",
					"unitsPerSR": "104"
				},
				{
					"productId": "129",
					"unitsPerSR": "1825"
				},
				{
					"productId": "157",
					"unitsPerSR": "2"
				},
				{
					"productId": "235",
					"unitsPerSR": "1"
				},
				{
					"productId": "236",
					"unitsPerSR": "1"
				},
				{
					"productId": "240",
					"unitsPerSR": "1"
				}
			],
			"mAdalianHoursPerSR": "72",
			"name": "Escape Module Assembly",
			"outputs": [
				{
					"productId": "241",
					"unitsPerSR": "1"
				}
			]
		},
		{
			"bAdalianHoursPerAction": "116",
			"buildingId": "6",
			"id": "229",
			"inputs": [
				{
					"productId": "99",
					"unitsPerSR": "3"
				},
				{
					"productId": "122",
					"unitsPerSR": "16"
				},
				{
					"productId": "213",
					"unitsPerSR": "1"
				},
				{
					"productId": "214",
					"unitsPerSR": "4"
				}
			],
			"mAdalianHoursPerSR": "24",
			"name": "Attitude Control Module Assembly",
			"outputs": [
				{
					"productId": "242",
					"unitsPerSR": "1"
				}
			]
		},
		{
			"bAdalianHoursPerAction": "96",
			"buildingId": "6",
			"id": "230",
			"inputs": [
				{
					"productId": "99",
					"unitsPerSR": "74"
				},
				{
					"productId": "157",
					"unitsPerSR": "250"
				},
				{
					"productId": "158",
					"unitsPerSR": "585"
				},
				{
					"productId": "203",
					"unitsPerSR": "1"
				}
			],
			"mAdalianHoursPerSR": "10",
			"name": "Power Module Assembly",
			"outputs": [
				{
					"productId": "243",
					"unitsPerSR": "5"
				}
			]
		},
		{
			"bAdalianHoursPerAction": "96",
			"buildingId": "6",
			"id": "231",
			"inputs": [
				{
					"productId": "3",
					"unitsPerSR": "500"
				},
				{
					"productId": "121",
					"unitsPerSR": "10"
				},
				{
					"productId": "172",
					"unitsPerSR": "474"
				},
				{
					"productId": "209",
					"unitsPerSR": "2"
				}
			],
			"mAdalianHoursPerSR": "9",
			"name": "Thermal Module Assembly",
			"outputs": [
				{
					"productId": "244",
					"unitsPerSR": "1"
				}
			]
		},
		{
			"bAdalianHoursPerAction": "200",
			"buildingId": "6",
			"id": "232",
			"inputs": [
				{
					"productId": "69",
					"unitsPerSR": "1500"
				},
				{
					"productId": "99",
					"unitsPerSR": "5"
				},
				{
					"productId": "124",
					"unitsPerSR": "495"
				},
				{
					"productId": "234",
					"unitsPerSR": "1"
				}
			],
			"mAdalianHoursPerSR": "96",
			"name": "Propulsion Module Assembly",
			"outputs": [
				{
					"productId": "245",
					"unitsPerSR": "1"
				}
			]
		},
		{
			"bAdalianHoursPerAction": "16",
			"buildingId": "3",
			"id": "233",
			"inputs": [
				{
					"productId": "2",
					"unitsPerSR": "4"
				},
				{
					"productId": "5",
					"unitsPerSR": "64"
				}
			],
			"mAdalianHoursPerSR": "0.0476",
			"name": "Sulfur Dioxide Plasma Catalysis",
			"outputs": [
				{
					"productId": "23",
					"unitsPerSR": "36"
				},
				{
					"productId": "51",
					"unitsPerSR": "32"
				}
			]
		},
		{
			"bAdalianHoursPerAction": "22",
			"buildingId": "3",
			"id": "234",
			"inputs": [
				{
					"productId": "106",
					"unitsPerSR": "189"
				},
				{
					"productId": "194",
					"unitsPerSR": "10049"
				}
			],
			"mAdalianHoursPerSR": "0.328",
			"name": "Parkes Process",
			"outputs": [
				{
					"productId": "60",
					"unitsPerSR": "99"
				},
				{
					"productId": "61",
					"unitsPerSR": "1"
				}
			]
		},
		{
			"bAdalianHoursPerAction": "26",
			"buildingId": "3",
			"id": "235",
			"inputs": [
				{
					"productId": "6",
					"unitsPerSR": "44"
				},
				{
					"productId": "11",
					"unitsPerSR": "100"
				},
				{
					"productId": "24",
					"unitsPerSR": "18"
				},
				{
					"productId": "45",
					"unitsPerSR": "117"
				}
			],
			"mAdalianHoursPerSR": "0.0893",
			"name": "Bicarbonate Solvay Process",
			"outputs": [
				{
					"productId": "28",
					"unitsPerSR": "168"
				},
				{
					"productId": "78",
					"unitsPerSR": "111"
				}
			]
		},
		{
			"bAdalianHoursPerAction": "26",
			"buildingId": "3",
			"id": "236",
			"inputs": [
				{
					"productId": "3",
					"unitsPerSR": "34"
				},
				{
					"productId": "6",
					"unitsPerSR": "44"
				},
				{
					"productId": "24",
					"unitsPerSR": "18"
				},
				{
					"productId": "45",
					"unitsPerSR": "117"
				}
			],
			"mAdalianHoursPerSR": "0.0682",
			"name": "Solvay-Hou Process",
			"outputs": [
				{
					"productId": "77",
					"unitsPerSR": "106"
				},
				{
					"productId": "110",
					"unitsPerSR": "107"
				}
			]
		},
		{
			"bAdalianHoursPerAction": "28",
			"buildingId": "3",
			"id": "237",
			"inputs": [
				{
					"productId": "3",
					"unitsPerSR": "34"
				},
				{
					"productId": "6",
					"unitsPerSR": "88"
				},
				{
					"productId": "24",
					"unitsPerSR": "36"
				},
				{
					"productId": "45",
					"unitsPerSR": "117"
				}
			],
			"mAdalianHoursPerSR": "0.0908",
			"name": "Bicarbonate Solvay-Hou Process",
			"outputs": [
				{
					"productId": "28",
					"unitsPerSR": "168"
				},
				{
					"productId": "110",
					"unitsPerSR": "107"
				}
			]
		},
		{
			"bAdalianHoursPerAction": "3",
			"buildingId": "3",
			"id": "238",
			"inputs": [
				{
					"productId": "28",
					"unitsPerSR": "168"
				}
			],
			"mAdalianHoursPerSR": "0.00252",
			"name": "Sodium Bicarbonate Calcination",
			"outputs": [
				{
					"productId": "6",
					"unitsPerSR": "44"
				},
				{
					"productId": "24",
					"unitsPerSR": "18"
				},
				{
					"productId": "77",
					"unitsPerSR": "106"
				}
			]
		},
		{
			"bAdalianHoursPerAction": "12",
			"buildingId": "5",
			"id": "239",
			"inputs": [
				{
					"productId": "197",
					"unitsPerSR": "2"
				}
			],
			"mAdalianHoursPerSR": "0.0004",
			"name": "Epoxy Stoichiometry and Packaging",
			"outputs": [
				{
					"productId": "136",
					"unitsPerSR": "1"
				}
			]
		},
		{
			"bAdalianHoursPerAction": "26",
			"buildingId": "4",
			"id": "240",
			"inputs": [
				{
					"productId": "6",
					"unitsPerSR": "740"
				},
				{
					"productId": "24",
					"unitsPerSR": "150"
				},
				{
					"productId": "36",
					"unitsPerSR": "720"
				}
			],
			"mAdalianHoursPerSR": "105",
			"name": "PEDOT Algae Growing",
			"outputs": [
				{
					"productId": "200",
					"unitsPerSR": "400"
				}
			]
		},
		{
			"bAdalianHoursPerAction": "22",
			"buildingId": "4",
			"id": "241",
			"inputs": [
				{
					"productId": "6",
					"unitsPerSR": "1150"
				},
				{
					"productId": "24",
					"unitsPerSR": "250"
				}
			],
			"mAdalianHoursPerSR": "115",
			"name": "BPA Algae Growing",
			"outputs": [
				{
					"productId": "108",
					"unitsPerSR": "400"
				}
			]
		},
		{
			"bAdalianHoursPerAction": "24",
			"buildingId": "4",
			"id": "242",
			"inputs": [
				{
					"productId": "6",
					"unitsPerSR": "1100"
				},
				{
					"productId": "24",
					"unitsPerSR": "250"
				}
			],
			"mAdalianHoursPerSR": "125",
			"name": "Novolak Algae Growing",
			"outputs": [
				{
					"productId": "140",
					"unitsPerSR": "400"
				}
			]
		},
		{
			"bAdalianHoursPerAction": "614.4",
			"buildingId": "6",
			"id": "243",
			"inputs": [
				{
					"productId": "148",
					"unitsPerSR": "6"
				},
				{
					"productId": "166",
					"unitsPerSR": "1"
				},
				{
					"productId": "239",
					"unitsPerSR": "4"
				},
				{
					"productId": "240",
					"unitsPerSR": "1"
				},
				{
					"productId": "241",
					"unitsPerSR": "1"
				},
				{
					"productId": "242",
					"unitsPerSR": "2"
				},
				{
					"productId": "243",
					"unitsPerSR": "4"
				},
				{
					"productId": "244",
					"unitsPerSR": "1"
				},
				{
					"productId": "245",
					"unitsPerSR": "2"
				}
			],
			"mAdalianHoursPerSR": "153.6",
			"name": "Light Transport Integration",
			"outputs": [
				{
					"productId": "S1",
					"unitsPerSR": "1"
				}
			]
		},
		{
			"bAdalianHoursPerAction": "1536",
			"buildingId": "6",
			"id": "244",
			"inputs": [
				{
					"productId": "148",
					"unitsPerSR": "36"
				},
				{
					"productId": "168",
					"unitsPerSR": "1"
				},
				{
					"productId": "240",
					"unitsPerSR": "3"
				},
				{
					"productId": "241",
					"unitsPerSR": "1"
				},
				{
					"productId": "242",
					"unitsPerSR": "6"
				},
				{
					"productId": "243",
					"unitsPerSR": "6"
				},
				{
					"productId": "244",
					"unitsPerSR": "3"
				},
				{
					"productId": "245",
					"unitsPerSR": "9"
				}
			],
			"mAdalianHoursPerSR": "384",
			"name": "Heavy Transport Integration",
			"outputs": [
				{
					"productId": "S2",
					"unitsPerSR": "1"
				}
			]
		},
		{
			"bAdalianHoursPerAction": "460.8",
			"buildingId": "6",
			"id": "245",
			"inputs": [
				{
					"productId": "165",
					"unitsPerSR": "1"
				},
				{
					"productId": "240",
					"unitsPerSR": "1"
				},
				{
					"productId": "241",
					"unitsPerSR": "3"
				},
				{
					"productId": "242",
					"unitsPerSR": "1"
				},
				{
					"productId": "243",
					"unitsPerSR": "2"
				},
				{
					"productId": "244",
					"unitsPerSR": "1"
				},
				{
					"productId": "245",
					"unitsPerSR": "1"
				}
			],
			"mAdalianHoursPerSR": "115.2",
			"name": "Shuttle Integration",
			"outputs": [
				{
					"productId": "S3",
					"unitsPerSR": "1"
				}
			]
		},
		{
			"bAdalianHoursPerAction": "N/A",
			"buildingId": "0",
			"id": "246",
			"inputs": [
				{
					"productId": "44",
					"unitsPerSR": "700000"
				},
				{
					"productId": "69",
					"unitsPerSR": "700000"
				},
				{
					"productId": "70",
					"unitsPerSR": "400000"
				}
			],
			"mAdalianHoursPerSR": "480",
			"name": "Warehouse Construction",
			"outputs": [
				{
					"productId": "B1",
					"unitsPerSR": "1"
				}
			]
		},
		{
			"bAdalianHoursPerAction": "N/A",
			"buildingId": "0",
			"id": "247",
			"inputs": [
				{
					"productId": "44",
					"unitsPerSR": "450000"
				},
				{
					"productId": "69",
					"unitsPerSR": "600000"
				},
				{
					"productId": "125",
					"unitsPerSR": "3000"
				},
				{
					"productId": "237",
					"unitsPerSR": "1"
				},
				{
					"productId": "243",
					"unitsPerSR": "6"
				}
			],
			"mAdalianHoursPerSR": "576",
			"name": "Extractor Construction",
			"outputs": [
				{
					"productId": "B2",
					"unitsPerSR": "1"
				}
			]
		},
		{
			"bAdalianHoursPerAction": "N/A",
			"buildingId": "0",
			"id": "248",
			"inputs": [
				{
					"productId": "44",
					"unitsPerSR": "800000"
				},
				{
					"productId": "69",
					"unitsPerSR": "400000"
				},
				{
					"productId": "70",
					"unitsPerSR": "300000"
				},
				{
					"productId": "104",
					"unitsPerSR": "2"
				},
				{
					"productId": "237",
					"unitsPerSR": "12"
				},
				{
					"productId": "238",
					"unitsPerSR": "2"
				},
				{
					"productId": "240",
					"unitsPerSR": "2"
				},
				{
					"productId": "243",
					"unitsPerSR": "16"
				},
				{
					"productId": "244",
					"unitsPerSR": "4"
				}
			],
			"mAdalianHoursPerSR": "1152",
			"name": "Refinery Construction",
			"outputs": [
				{
					"productId": "B3",
					"unitsPerSR": "1"
				}
			]
		},
		{
			"bAdalianHoursPerAction": "N/A",
			"buildingId": "0",
			"id": "249",
			"inputs": [
				{
					"productId": "24",
					"unitsPerSR": "1400000"
				},
				{
					"productId": "41",
					"unitsPerSR": "300000"
				},
				{
					"productId": "44",
					"unitsPerSR": "500000"
				},
				{
					"productId": "56",
					"unitsPerSR": "300000"
				},
				{
					"productId": "69",
					"unitsPerSR": "100000"
				},
				{
					"productId": "70",
					"unitsPerSR": "300000"
				},
				{
					"productId": "74",
					"unitsPerSR": "25000"
				},
				{
					"productId": "180",
					"unitsPerSR": "125000"
				},
				{
					"productId": "237",
					"unitsPerSR": "16"
				},
				{
					"productId": "238",
					"unitsPerSR": "12"
				},
				{
					"productId": "240",
					"unitsPerSR": "3"
				},
				{
					"productId": "243",
					"unitsPerSR": "8"
				}
			],
			"mAdalianHoursPerSR": "960",
			"name": "Bioreactor Construction",
			"outputs": [
				{
					"productId": "B4",
					"unitsPerSR": "1"
				}
			]
		},
		{
			"bAdalianHoursPerAction": "N/A",
			"buildingId": "0",
			"id": "250",
			"inputs": [
				{
					"productId": "44",
					"unitsPerSR": "900000"
				},
				{
					"productId": "69",
					"unitsPerSR": "1100000"
				},
				{
					"productId": "70",
					"unitsPerSR": "700000"
				},
				{
					"productId": "237",
					"unitsPerSR": "4"
				},
				{
					"productId": "238",
					"unitsPerSR": "40"
				},
				{
					"productId": "240",
					"unitsPerSR": "8"
				},
				{
					"productId": "243",
					"unitsPerSR": "20"
				},
				{
					"productId": "244",
					"unitsPerSR": "6"
				}
			],
			"mAdalianHoursPerSR": "1440",
			"name": "Factory Construction",
			"outputs": [
				{
					"productId": "B5",
					"unitsPerSR": "1"
				}
			]
		},
		{
			"bAdalianHoursPerAction": "N/A",
			"buildingId": "0",
			"id": "251",
			"inputs": [
				{
					"productId": "44",
					"unitsPerSR": "2000000"
				},
				{
					"productId": "69",
					"unitsPerSR": "2400000"
				},
				{
					"productId": "70",
					"unitsPerSR": "1000000"
				},
				{
					"productId": "237",
					"unitsPerSR": "8"
				},
				{
					"productId": "238",
					"unitsPerSR": "60"
				},
				{
					"productId": "240",
					"unitsPerSR": "10"
				},
				{
					"productId": "243",
					"unitsPerSR": "24"
				},
				{
					"productId": "244",
					"unitsPerSR": "6"
				}
			],
			"mAdalianHoursPerSR": "2592",
			"name": "Shipyard Construction",
			"outputs": [
				{
					"productId": "B6",
					"unitsPerSR": "1"
				}
			]
		},
		{
			"bAdalianHoursPerAction": "N/A",
			"buildingId": "0",
			"id": "252",
			"inputs": [
				{
					"productId": "44",
					"unitsPerSR": "4300000"
				},
				{
					"productId": "69",
					"unitsPerSR": "2200000"
				},
				{
					"productId": "70",
					"unitsPerSR": "3200000"
				},
				{
					"productId": "101",
					"unitsPerSR": "200000"
				},
				{
					"productId": "237",
					"unitsPerSR": "40"
				},
				{
					"productId": "238",
					"unitsPerSR": "120"
				},
				{
					"productId": "240",
					"unitsPerSR": "16"
				},
				{
					"productId": "243",
					"unitsPerSR": "40"
				},
				{
					"productId": "244",
					"unitsPerSR": "40"
				}
			],
			"mAdalianHoursPerSR": "2592",
			"name": "Spaceport Construction",
			"outputs": [
				{
					"productId": "B7",
					"unitsPerSR": "1"
				}
			]
		},
		{
			"bAdalianHoursPerAction": "N/A",
			"buildingId": "0",
			"id": "253",
			"inputs": [
				{
					"productId": "44",
					"unitsPerSR": "3000000"
				},
				{
					"productId": "69",
					"unitsPerSR": "2500000"
				},
				{
					"productId": "70",
					"unitsPerSR": "3000000"
				},
				{
					"productId": "101",
					"unitsPerSR": "500000"
				},
				{
					"productId": "133",
					"unitsPerSR": "6"
				},
				{
					"productId": "235",
					"unitsPerSR": "8"
				},
				{
					"productId": "240",
					"unitsPerSR": "12"
				},
				{
					"productId": "243",
					"unitsPerSR": "20"
				},
				{
					"productId": "244",
					"unitsPerSR": "20"
				}
			],
			"mAdalianHoursPerSR": "2880",
			"name": "Marketplace Construction",
			"outputs": [
				{
					"productId": "B8",
					"unitsPerSR": "1"
				}
			]
		},
		{
			"bAdalianHoursPerAction": "N/A",
			"buildingId": "0",
			"id": "254",
			"inputs": [
				{
					"productId": "24",
					"unitsPerSR": "300000"
				},
				{
					"productId": "44",
					"unitsPerSR": "5000000"
				},
				{
					"productId": "56",
					"unitsPerSR": "200000"
				},
				{
					"productId": "69",
					"unitsPerSR": "4000000"
				},
				{
					"productId": "70",
					"unitsPerSR": "5000000"
				},
				{
					"productId": "101",
					"unitsPerSR": "1000000"
				},
				{
					"productId": "133",
					"unitsPerSR": "12"
				},
				{
					"productId": "235",
					"unitsPerSR": "16"
				},
				{
					"productId": "240",
					"unitsPerSR": "20"
				},
				{
					"productId": "243",
					"unitsPerSR": "30"
				},
				{
					"productId": "244",
					"unitsPerSR": "20"
				}
			],
			"mAdalianHoursPerSR": "4032",
			"name": "Habitat Construction",
			"outputs": [
				{
					"productId": "B9",
					"unitsPerSR": "1"
				}
			]
		}
	],
	"products": [
		{
			"category": "Volatile",
			"id": "1",
			"massKilogramsPerUnit": "1",
			"name": "Water",
			"quantized": false,
			"type": "Raw Material",
			"volumeLitersPerUnit": "0.971"
		},
		{
			"category": "Volatile",
			"id": "2",
			"massKilogramsPerUnit": "1",
			"name": "Hydrogen",
			"quantized": false,
			"type": "Raw Material",
			"volumeLitersPerUnit": "14.1"
		},
		{
			"category": "Volatile",
			"id": "3",
			"massKilogramsPerUnit": "1",
			"name": "Ammonia",
			"quantized": false,
			"type": "Raw Material",
			"volumeLitersPerUnit": "1.37"
		},
		{
			"category": "Volatile",
			"id": "4",
			"massKilogramsPerUnit": "1",
			"name": "Nitrogen",
			"quantized": false,
			"type": "Raw Material",
			"volumeLitersPerUnit": "1.24"
		},
		{
			"category": "Volatile",
			"id": "5",
			"massKilogramsPerUnit": "1",
			"name": "Sulfur Dioxide",
			"quantized": false,
			"type": "Raw Material",
			"volumeLitersPerUnit": "0.684"
		},
		{
			"category": "Volatile",
			"id": "6",
			"massKilogramsPerUnit": "1",
			"name": "Carbon Dioxide",
			"quantized": false,
			"type": "Raw Material",
			"volumeLitersPerUnit": "0.801"
		},
		{
			"category": "Volatile",
			"id": "7",
			"massKilogramsPerUnit": "1",
			"name": "Carbon Monoxide",
			"quantized": false,
			"type": "Raw Material",
			"volumeLitersPerUnit": "1.25"
		},
		{
			"category": "Volatile",
			"id": "8",
			"massKilogramsPerUnit": "1",
			"name": "Methane",
			"quantized": false,
			"type": "Raw Material",
			"volumeLitersPerUnit": "2.22"
		},
		{
			"category": "Organic",
			"id": "9",
			"massKilogramsPerUnit": "1",
			"name": "Apatite",
			"quantized": false,
			"type": "Raw Material",
			"volumeLitersPerUnit": "0.521"
		},
		{
			"category": "Organic",
			"id": "10",
			"massKilogramsPerUnit": "1",
			"name": "Bitumen",
			"quantized": false,
			"type": "Raw Material",
			"volumeLitersPerUnit": "1.6"
		},
		{
			"category": "Organic",
			"id": "11",
			"massKilogramsPerUnit": "1",
			"name": "Calcite",
			"quantized": false,
			"type": "Raw Material",
			"volumeLitersPerUnit": "0.615"
		},
		{
			"category": "Metal",
			"id": "12",
			"massKilogramsPerUnit": "1",
			"name": "Feldspar",
			"quantized": false,
			"type": "Raw Material",
			"volumeLitersPerUnit": "0.606"
		},
		{
			"category": "Metal",
			"id": "13",
			"massKilogramsPerUnit": "1",
			"name": "Olivine",
			"quantized": false,
			"type": "Raw Material",
			"volumeLitersPerUnit": "0.617"
		},
		{
			"category": "Metal",
			"id": "14",
			"massKilogramsPerUnit": "1",
			"name": "Pyroxene",
			"quantized": false,
			"type": "Raw Material",
			"volumeLitersPerUnit": "0.476"
		},
		{
			"category": "Fissile",
			"id": "15",
			"massKilogramsPerUnit": "1",
			"name": "Coffinite",
			"quantized": false,
			"type": "Raw Material",
			"volumeLitersPerUnit": "0.327"
		},
		{
			"category": "Rare Earth",
			"id": "16",
			"massKilogramsPerUnit": "1",
			"name": "Merrillite",
			"quantized": false,
			"type": "Raw Material",
			"volumeLitersPerUnit": "0.521"
		},
		{
			"category": "Rare Earth",
			"id": "17",
			"massKilogramsPerUnit": "1",
			"name": "Xenotime",
			"quantized": false,
			"type": "Raw Material",
			"volumeLitersPerUnit": "0.358"
		},
		{
			"category": "Metal",
			"id": "18",
			"massKilogramsPerUnit": "1",
			"name": "Rhabdite",
			"quantized": false,
			"type": "Raw Material",
			"volumeLitersPerUnit": "0.233"
		},
		{
			"category": "Metal",
			"id": "19",
			"massKilogramsPerUnit": "1",
			"name": "Graphite",
			"quantized": false,
			"type": "Raw Material",
			"volumeLitersPerUnit": "0.737"
		},
		{
			"category": "Metal",
			"id": "20",
			"massKilogramsPerUnit": "1",
			"name": "Taenite",
			"quantized": false,
			"type": "Raw Material",
			"volumeLitersPerUnit": "0.208"
		},
		{
			"category": "Metal",
			"id": "21",
			"massKilogramsPerUnit": "1",
			"name": "Troilite",
			"quantized": false,
			"type": "Raw Material",
			"volumeLitersPerUnit": "0.362"
		},
		{
			"category": "Fissile",
			"id": "22",
			"massKilogramsPerUnit": "1",
			"name": "Uraninite",
			"quantized": false,
			"type": "Raw Material",
			"volumeLitersPerUnit": "0.156"
		},
		{
			"category": "Nonmetal",
			"id": "23",
			"massKilogramsPerUnit": "1",
			"name": "Oxygen",
			"quantized": false,
			"type": "Refined Material",
			"volumeLitersPerUnit": "0.876"
		},
		{
			"category": "Refined Volatile",
			"id": "24",
			"massKilogramsPerUnit": "1",
			"name": "Deionized Water",
			"quantized": false,
			"type": "Refined Material",
			"volumeLitersPerUnit": "1"
		},
		{
			"category": "Salt",
			"id": "25",
			"massKilogramsPerUnit": "1",
			"name": "Raw Salts",
			"quantized": false,
			"type": "Refined Material",
			"volumeLitersPerUnit": "0.775"
		},
		{
			"category": "Oxide",
			"id": "26",
			"massKilogramsPerUnit": "1",
			"name": "Silica",
			"quantized": false,
			"type": "Refined Material",
			"volumeLitersPerUnit": "0.629"
		},
		{
			"category": "Refined Organic",
			"id": "27",
			"massKilogramsPerUnit": "1",
			"name": "Naphtha",
			"quantized": false,
			"type": "Refined Material",
			"volumeLitersPerUnit": "1.3"
		},
		{
			"category": "Carbonate",
			"id": "28",
			"massKilogramsPerUnit": "1",
			"name": "Sodium Bicarbonate",
			"quantized": false,
			"type": "Refined Material",
			"volumeLitersPerUnit": "0.909"
		},
		{
			"category": "Refined Metal",
			"id": "29",
			"massKilogramsPerUnit": "1",
			"name": "Iron",
			"quantized": false,
			"type": "Refined Material",
			"volumeLitersPerUnit": "0.14"
		},
		{
			"category": "Refined Metal",
			"id": "30",
			"massKilogramsPerUnit": "1",
			"name": "Copper",
			"quantized": false,
			"type": "Refined Material",
			"volumeLitersPerUnit": "0.123"
		},
		{
			"category": "Refined Metal",
			"id": "31",
			"massKilogramsPerUnit": "1",
			"name": "Nickel",
			"quantized": false,
			"type": "Refined Material",
			"volumeLitersPerUnit": "0.161"
		},
		{
			"category": "Oxide",
			"id": "32",
			"massKilogramsPerUnit": "1",
			"name": "Quicklime",
			"quantized": false,
			"type": "Refined Material",
			"volumeLitersPerUnit": "0.599"
		},
		{
			"category": "Refined Organic",
			"id": "33",
			"massKilogramsPerUnit": "1",
			"name": "Acetylene",
			"quantized": false,
			"type": "Refined Material",
			"volumeLitersPerUnit": "1.44"
		},
		{
			"category": "Carbonate",
			"id": "34",
			"massKilogramsPerUnit": "1",
			"name": "Ammonium Carbonate",
			"quantized": false,
			"type": "Refined Material",
			"volumeLitersPerUnit": "1.33"
		},
		{
			"category": "Phosphate",
			"id": "35",
			"massKilogramsPerUnit": "1",
			"name": "Triple Superphosphate",
			"quantized": false,
			"type": "Refined Material",
			"volumeLitersPerUnit": "0.87"
		},
		{
			"category": "Salt",
			"id": "36",
			"massKilogramsPerUnit": "1",
			"name": "Phosphate and Sulfate Salts",
			"quantized": false,
			"type": "Refined Material",
			"volumeLitersPerUnit": "0.595"
		},
		{
			"category": "Sulfide",
			"id": "37",
			"massKilogramsPerUnit": "1",
			"name": "Iron Sulfide",
			"quantized": false,
			"type": "Refined Material",
			"volumeLitersPerUnit": "0.344"
		},
		{
			"category": "Sulfide",
			"id": "38",
			"massKilogramsPerUnit": "1",
			"name": "Lead Sulfide",
			"quantized": false,
			"type": "Refined Material",
			"volumeLitersPerUnit": "0.219"
		},
		{
			"category": "Sulfide",
			"id": "39",
			"massKilogramsPerUnit": "1",
			"name": "Tin Sulfide",
			"quantized": false,
			"type": "Refined Material",
			"volumeLitersPerUnit": "0.319"
		},
		{
			"category": "Sulfide",
			"id": "40",
			"massKilogramsPerUnit": "1",
			"name": "Molybdenum Disulfide",
			"quantized": false,
			"type": "Refined Material",
			"volumeLitersPerUnit": "0.329"
		},
		{
			"category": "Processed Glass",
			"id": "41",
			"massKilogramsPerUnit": "1",
			"name": "Fused Quartz",
			"quantized": false,
			"type": "Manufactured Good",
			"volumeLitersPerUnit": "0.415"
		},
		{
			"category": "Fabric",
			"id": "42",
			"massKilogramsPerUnit": "1",
			"name": "Fiberglass",
			"quantized": false,
			"type": "Manufactured Good",
			"volumeLitersPerUnit": "1.26"
		},
		{
			"category": "Processed Metal",
			"id": "43",
			"massKilogramsPerUnit": "1",
			"name": "Bare Copper Wire",
			"quantized": false,
			"type": "Manufactured Good",
			"volumeLitersPerUnit": "0.123"
		},
		{
			"category": "Construction",
			"id": "44",
			"massKilogramsPerUnit": "1",
			"name": "Cement",
			"quantized": false,
			"type": "Manufactured Good",
			"volumeLitersPerUnit": "1.13"
		},
		{
			"category": "Salt",
			"id": "45",
			"massKilogramsPerUnit": "1",
			"name": "Sodium Chloride",
			"quantized": false,
			"type": "Refined Material",
			"volumeLitersPerUnit": "1.41"
		},
		{
			"category": "Salt",
			"id": "46",
			"massKilogramsPerUnit": "1",
			"name": "Potassium Chloride",
			"quantized": false,
			"type": "Refined Material",
			"volumeLitersPerUnit": "0.842"
		},
		{
			"category": "Salt",
			"id": "47",
			"massKilogramsPerUnit": "1",
			"name": "Borax",
			"quantized": false,
			"type": "Refined Material",
			"volumeLitersPerUnit": "0.963"
		},
		{
			"category": "Carbonate",
			"id": "48",
			"massKilogramsPerUnit": "1",
			"name": "Lithium Carbonate",
			"quantized": false,
			"type": "Refined Material",
			"volumeLitersPerUnit": "0.948"
		},
		{
			"category": "Salt",
			"id": "49",
			"massKilogramsPerUnit": "1",
			"name": "Magnesium Chloride",
			"quantized": false,
			"type": "Refined Material",
			"volumeLitersPerUnit": "0.718"
		},
		{
			"category": "Refined Organic",
			"id": "50",
			"massKilogramsPerUnit": "1",
			"name": "Propylene",
			"quantized": false,
			"type": "Refined Material",
			"volumeLitersPerUnit": "2.04"
		},
		{
			"category": "Nonmetal",
			"id": "51",
			"massKilogramsPerUnit": "1",
			"name": "Sulfur",
			"quantized": false,
			"type": "Refined Material",
			"volumeLitersPerUnit": "0.805"
		},
		{
			"category": "Alloy",
			"id": "52",
			"massKilogramsPerUnit": "1",
			"name": "Steel",
			"quantized": false,
			"type": "Refined Material",
			"volumeLitersPerUnit": "0.159"
		},
		{
			"category": "Nonmetal",
			"id": "53",
			"massKilogramsPerUnit": "1",
			"name": "Silicon",
			"quantized": false,
			"type": "Refined Material",
			"volumeLitersPerUnit": "0.715"
		},
		{
			"category": "Acid",
			"id": "54",
			"massKilogramsPerUnit": "1",
			"name": "Nitric Acid",
			"quantized": false,
			"type": "Refined Material",
			"volumeLitersPerUnit": "0.893"
		},
		{
			"category": "Acid",
			"id": "55",
			"massKilogramsPerUnit": "1",
			"name": "Sulfuric Acid",
			"quantized": false,
			"type": "Refined Material",
			"volumeLitersPerUnit": "0.687"
		},
		{
			"category": "Organic Substrate",
			"id": "56",
			"massKilogramsPerUnit": "1",
			"name": "Soil",
			"quantized": false,
			"type": "Crop",
			"volumeLitersPerUnit": "0.714"
		},
		{
			"category": "Alloy",
			"id": "57",
			"massKilogramsPerUnit": "1",
			"name": "Ferrosilicon",
			"quantized": false,
			"type": "Refined Material",
			"volumeLitersPerUnit": "0.271"
		},
		{
			"category": "Semi-refined",
			"id": "58",
			"massKilogramsPerUnit": "1",
			"name": "Weathered Olivine",
			"quantized": false,
			"type": "Refined Material",
			"volumeLitersPerUnit": "0.521"
		},
		{
			"category": "Acid",
			"id": "59",
			"massKilogramsPerUnit": "1",
			"name": "Oxalic Acid",
			"quantized": false,
			"type": "Refined Material",
			"volumeLitersPerUnit": "1.05"
		},
		{
			"category": "Refined Metal",
			"id": "60",
			"massKilogramsPerUnit": "1",
			"name": "Silver",
			"quantized": false,
			"type": "Refined Material",
			"volumeLitersPerUnit": "0.119"
		},
		{
			"category": "Refined Metal",
			"id": "61",
			"massKilogramsPerUnit": "1",
			"name": "Gold",
			"quantized": false,
			"type": "Refined Material",
			"volumeLitersPerUnit": "0.065"
		},
		{
			"category": "Refined Metal",
			"id": "62",
			"massKilogramsPerUnit": "1",
			"name": "Tin",
			"quantized": false,
			"type": "Refined Material",
			"volumeLitersPerUnit": "0.171"
		},
		{
			"category": "Oxide",
			"id": "63",
			"massKilogramsPerUnit": "1",
			"name": "Iron Oxide",
			"quantized": false,
			"type": "Refined Material",
			"volumeLitersPerUnit": "0.387"
		},
		{
			"category": "Ingredient",
			"id": "64",
			"massKilogramsPerUnit": "1",
			"name": "Spirulina and Chlorella Algae",
			"quantized": false,
			"type": "Crop",
			"volumeLitersPerUnit": "2.5"
		},
		{
			"category": "Oxide",
			"id": "65",
			"massKilogramsPerUnit": "1",
			"name": "Molybdenum Trioxide",
			"quantized": false,
			"type": "Refined Material",
			"volumeLitersPerUnit": "0.426"
		},
		{
			"category": "Powder",
			"id": "66",
			"massKilogramsPerUnit": "1",
			"name": "Silica Powder",
			"quantized": false,
			"type": "Manufactured Good",
			"volumeLitersPerUnit": "0.755"
		},
		{
			"category": "Electronics",
			"id": "67",
			"massKilogramsPerUnit": "1",
			"name": "Solder",
			"quantized": false,
			"type": "Manufactured Good",
			"volumeLitersPerUnit": "0.148"
		},
		{
			"category": "Processed Glass",
			"id": "68",
			"massKilogramsPerUnit": "1",
			"name": "Fiber Optic Cable",
			"quantized": false,
			"type": "Manufactured Good",
			"volumeLitersPerUnit": "0.886"
		},
		{
			"category": "Processed Metal",
			"id": "69",
			"massKilogramsPerUnit": "1",
			"name": "Steel Beam",
			"quantized": false,
			"type": "Manufactured Good",
			"volumeLitersPerUnit": "1.1"
		},
		{
			"category": "Processed Metal",
			"id": "70",
			"massKilogramsPerUnit": "1",
			"name": "Steel Sheet",
			"quantized": false,
			"type": "Manufactured Good",
			"volumeLitersPerUnit": "0.15"
		},
		{
			"category": "Processed Metal",
			"id": "71",
			"massKilogramsPerUnit": "1",
			"name": "Steel Pipe",
			"quantized": false,
			"type": "Manufactured Good",
			"volumeLitersPerUnit": "1.2"
		},
		{
			"category": "Processed Metal",
			"id": "72",
			"massKilogramsPerUnit": "1",
			"name": "Steel Wire",
			"quantized": false,
			"type": "Manufactured Good",
			"volumeLitersPerUnit": "0.15"
		},
		{
			"category": "Refined Organic",
			"id": "73",
			"massKilogramsPerUnit": "1",
			"name": "Acrylonitrile",
			"quantized": false,
			"type": "Refined Material",
			"volumeLitersPerUnit": "1.23"
		},
		{
			"category": "Polymer",
			"id": "74",
			"massKilogramsPerUnit": "1",
			"name": "Polypropylene",
			"quantized": false,
			"type": "Manufactured Good",
			"volumeLitersPerUnit": "1.57"
		},
		{
			"category": "Refined Metal",
			"id": "75",
			"massKilogramsPerUnit": "1",
			"name": "Magnesium",
			"quantized": false,
			"type": "Refined Material",
			"volumeLitersPerUnit": "0.632"
		},
		{
			"category": "Nonmetal",
			"id": "76",
			"massKilogramsPerUnit": "1",
			"name": "Chlorine",
			"quantized": false,
			"type": "Refined Material",
			"volumeLitersPerUnit": "4.02"
		},
		{
			"category": "Carbonate",
			"id": "77",
			"massKilogramsPerUnit": "1",
			"name": "Sodium Carbonate",
			"quantized": false,
			"type": "Refined Material",
			"volumeLitersPerUnit": "0.787"
		},
		{
			"category": "Salt",
			"id": "78",
			"massKilogramsPerUnit": "1",
			"name": "Calcium Chloride",
			"quantized": false,
			"type": "Refined Material",
			"volumeLitersPerUnit": "0.775"
		},
		{
			"category": "Oxide",
			"id": "79",
			"massKilogramsPerUnit": "1",
			"name": "Boria",
			"quantized": false,
			"type": "Refined Material",
			"volumeLitersPerUnit": "0.739"
		},
		{
			"category": "Sulfate",
			"id": "80",
			"massKilogramsPerUnit": "1",
			"name": "Lithium Sulfate",
			"quantized": false,
			"type": "Refined Material",
			"volumeLitersPerUnit": "0.751"
		},
		{
			"category": "Acid",
			"id": "81",
			"massKilogramsPerUnit": "1",
			"name": "Hydrochloric Acid",
			"quantized": false,
			"type": "Refined Material",
			"volumeLitersPerUnit": "1.04"
		},
		{
			"category": "Acid",
			"id": "82",
			"massKilogramsPerUnit": "1",
			"name": "Hydrofluoric Acid",
			"quantized": false,
			"type": "Refined Material",
			"volumeLitersPerUnit": "1.09"
		},
		{
			"category": "Acid",
			"id": "83",
			"massKilogramsPerUnit": "1",
			"name": "Phosphoric Acid",
			"quantized": false,
			"type": "Refined Material",
			"volumeLitersPerUnit": "0.694"
		},
		{
			"category": "Acid",
			"id": "84",
			"massKilogramsPerUnit": "1",
			"name": "Boric Acid",
			"quantized": false,
			"type": "Refined Material",
			"volumeLitersPerUnit": "1.39"
		},
		{
			"category": "Oxide",
			"id": "85",
			"massKilogramsPerUnit": "1",
			"name": "Zinc Oxide",
			"quantized": false,
			"type": "Refined Material",
			"volumeLitersPerUnit": "0.357"
		},
		{
			"category": "Oxide",
			"id": "86",
			"massKilogramsPerUnit": "1",
			"name": "Nickel Oxide",
			"quantized": false,
			"type": "Refined Material",
			"volumeLitersPerUnit": "0.3"
		},
		{
			"category": "Oxide",
			"id": "87",
			"massKilogramsPerUnit": "1",
			"name": "Magnesia",
			"quantized": false,
			"type": "Refined Material",
			"volumeLitersPerUnit": "0.559"
		},
		{
			"category": "Oxide",
			"id": "88",
			"massKilogramsPerUnit": "1",
			"name": "Alumina",
			"quantized": false,
			"type": "Refined Material",
			"volumeLitersPerUnit": "0.46"
		},
		{
			"category": "Base",
			"id": "89",
			"massKilogramsPerUnit": "1",
			"name": "Sodium Hydroxide",
			"quantized": false,
			"type": "Refined Material",
			"volumeLitersPerUnit": "0.671"
		},
		{
			"category": "Base",
			"id": "90",
			"massKilogramsPerUnit": "1",
			"name": "Potassium Hydroxide",
			"quantized": false,
			"type": "Refined Material",
			"volumeLitersPerUnit": "0.674"
		},
		{
			"category": "Ingredient",
			"id": "91",
			"massKilogramsPerUnit": "1",
			"name": "Soybeans",
			"quantized": false,
			"type": "Crop",
			"volumeLitersPerUnit": "1.53"
		},
		{
			"category": "Ingredient",
			"id": "92",
			"massKilogramsPerUnit": "1",
			"name": "Potatoes",
			"quantized": false,
			"type": "Crop",
			"volumeLitersPerUnit": "1.52"
		},
		{
			"category": "Salt",
			"id": "93",
			"massKilogramsPerUnit": "1",
			"name": "Ammonium Oxalate",
			"quantized": false,
			"type": "Refined Material",
			"volumeLitersPerUnit": "1.11"
		},
		{
			"category": "Sulfate",
			"id": "94",
			"massKilogramsPerUnit": "1",
			"name": "Rare Earth Sulfates",
			"quantized": false,
			"type": "Refined Material",
			"volumeLitersPerUnit": "0.681"
		},
		{
			"category": "Alloy",
			"id": "95",
			"massKilogramsPerUnit": "1",
			"name": "Ferrochromium",
			"quantized": false,
			"type": "Refined Material",
			"volumeLitersPerUnit": "0.222"
		},
		{
			"category": "Oxide",
			"id": "96",
			"massKilogramsPerUnit": "1",
			"name": "Yellowcake",
			"quantized": false,
			"type": "Refined Material",
			"volumeLitersPerUnit": "0.172"
		},
		{
			"category": "Ceramic",
			"id": "97",
			"massKilogramsPerUnit": "1",
			"name": "Alumina Ceramic",
			"quantized": false,
			"type": "Manufactured Good",
			"volumeLitersPerUnit": "0.316"
		},
		{
			"category": "Alloy",
			"id": "98",
			"massKilogramsPerUnit": "1",
			"name": "Austenitic Nichrome",
			"quantized": false,
			"type": "Refined Material",
			"volumeLitersPerUnit": "0.135"
		},
		{
			"category": "Electronics",
			"id": "99",
			"massKilogramsPerUnit": "1",
			"name": "Copper Wire",
			"quantized": false,
			"type": "Manufactured Good",
			"volumeLitersPerUnit": "0.152"
		},
		{
			"category": "Crystal",
			"id": "100",
			"massKilogramsPerUnit": "1",
			"name": "Silicon Wafer",
			"quantized": false,
			"type": "Manufactured Good",
			"volumeLitersPerUnit": "0.472"
		},
		{
			"category": "Processed Metal",
			"id": "101",
			"massKilogramsPerUnit": "1",
			"name": "Steel Cable",
			"quantized": false,
			"type": "Manufactured Good",
			"volumeLitersPerUnit": "0.182"
		},
		{
			"category": "Polymer",
			"id": "102",
			"massKilogramsPerUnit": "1",
			"name": "Polyacrylonitrile",
			"quantized": false,
			"type": "Manufactured Good",
			"volumeLitersPerUnit": "1.21"
		},
		{
			"category": "Ingredient",
			"id": "103",
			"massKilogramsPerUnit": "1",
			"name": "Natural Flavorings",
			"quantized": false,
			"type": "Crop",
			"volumeLitersPerUnit": "1.82"
		},
		{
			"category": "Refined Metal",
			"id": "104",
			"massKilogramsPerUnit": "1",
			"name": "Platinum",
			"quantized": false,
			"type": "Refined Material",
			"volumeLitersPerUnit": "0.058"
		},
		{
			"category": "Salt",
			"id": "105",
			"massKilogramsPerUnit": "1",
			"name": "Lithium Chloride",
			"quantized": false,
			"type": "Refined Material",
			"volumeLitersPerUnit": "0.805"
		},
		{
			"category": "Refined Metal",
			"id": "106",
			"massKilogramsPerUnit": "1",
			"name": "Zinc",
			"quantized": false,
			"type": "Refined Material",
			"volumeLitersPerUnit": "0.175"
		},
		{
			"category": "Refined Organic",
			"id": "107",
			"massKilogramsPerUnit": "1",
			"name": "Epichlorohydrin",
			"quantized": false,
			"type": "Refined Material",
			"volumeLitersPerUnit": "1.06"
		},
		{
			"category": "Grown Organic",
			"id": "108",
			"massKilogramsPerUnit": "1",
			"name": "Bisphenol A",
			"quantized": false,
			"type": "Crop",
			"volumeLitersPerUnit": "1.04"
		},
		{
			"category": "Oxide",
			"id": "109",
			"massKilogramsPerUnit": "1",
			"name": "Rare Earth Oxides",
			"quantized": false,
			"type": "Refined Material",
			"volumeLitersPerUnit": "0.272"
		},
		{
			"category": "Salt",
			"id": "110",
			"massKilogramsPerUnit": "1",
			"name": "Ammonium Chloride",
			"quantized": false,
			"type": "Refined Material",
			"volumeLitersPerUnit": "1.09"
		},
		{
			"category": "Refined Metal",
			"id": "111",
			"massKilogramsPerUnit": "1",
			"name": "Aluminium",
			"quantized": false,
			"type": "Refined Material",
			"volumeLitersPerUnit": "0.463"
		},
		{
			"category": "Refined Metal",
			"id": "112",
			"massKilogramsPerUnit": "1",
			"name": "Calcium",
			"quantized": false,
			"type": "Refined Material",
			"volumeLitersPerUnit": "1.29"
		},
		{
			"category": "Salt",
			"id": "113",
			"massKilogramsPerUnit": "1",
			"name": "Sodium Chromate",
			"quantized": false,
			"type": "Refined Material",
			"volumeLitersPerUnit": "0.617"
		},
		{
			"category": "Semi-refined",
			"id": "114",
			"massKilogramsPerUnit": "1",
			"name": "Leached Coffinite",
			"quantized": false,
			"type": "Refined Material",
			"volumeLitersPerUnit": "0.333"
		},
		{
			"category": "Nitrate",
			"id": "115",
			"massKilogramsPerUnit": "1",
			"name": "Uranyl Nitrate",
			"quantized": false,
			"type": "Refined Material",
			"volumeLitersPerUnit": "0.593"
		},
		{
			"category": "Nonmetal",
			"id": "116",
			"massKilogramsPerUnit": "1",
			"name": "Fluorine",
			"quantized": false,
			"type": "Refined Material",
			"volumeLitersPerUnit": "1.52"
		},
		{
			"category": "Salt",
			"id": "117",
			"massKilogramsPerUnit": "1",
			"name": "Sodium Tungstate",
			"quantized": false,
			"type": "Refined Material",
			"volumeLitersPerUnit": "0.435"
		},
		{
			"category": "Alloy",
			"id": "118",
			"massKilogramsPerUnit": "1",
			"name": "Ferrite",
			"quantized": false,
			"type": "Refined Material",
			"volumeLitersPerUnit": "0.22"
		},
		{
			"category": "Electronics",
			"id": "119",
			"massKilogramsPerUnit": "1",
			"name": "Diode",
			"quantized": false,
			"type": "Manufactured Good",
			"volumeLitersPerUnit": "0.8"
		},
		{
			"category": "Electronics",
			"id": "120",
			"massKilogramsPerUnit": "1",
			"name": "Laser Diode",
			"quantized": false,
			"type": "Manufactured Good",
			"volumeLitersPerUnit": "0.8"
		},
		{
			"category": "Mechanism",
			"id": "121",
			"massKilogramsPerUnit": "1",
			"name": "Ball Valve",
			"quantized": false,
			"type": "Manufactured Good",
			"volumeLitersPerUnit": "1.48"
		},
		{
			"category": "Processed Metal",
			"id": "122",
			"massKilogramsPerUnit": "1",
			"name": "Aluminium Beam",
			"quantized": false,
			"type": "Manufactured Good",
			"volumeLitersPerUnit": "3.19"
		},
		{
			"category": "Processed Metal",
			"id": "123",
			"massKilogramsPerUnit": "1",
			"name": "Aluminium Sheet",
			"quantized": false,
			"type": "Manufactured Good",
			"volumeLitersPerUnit": "0.436"
		},
		{
			"category": "Processed Metal",
			"id": "124",
			"massKilogramsPerUnit": "1",
			"name": "Aluminium Pipe",
			"quantized": false,
			"type": "Manufactured Good",
			"volumeLitersPerUnit": "3.19"
		},
		{
			"category": "Fabric",
			"id": "125",
			"massKilogramsPerUnit": "1",
			"name": "Polyacrylonitrile Fabric",
			"quantized": false,
			"type": "Manufactured Good",
			"volumeLitersPerUnit": "2.82"
		},
		{
			"category": "Mechanism",
			"id": "126",
			"massKilogramsPerUnit": "3",
			"name": "Cold Gas Thruster",
			"quantized": true,
			"type": "Manufactured Good",
			"volumeLitersPerUnit": "1.725"
		},
		{
			"category": "Mechanism",
			"id": "127",
			"massKilogramsPerUnit": "3",
			"name": "Cold Gas Torque Thruster",
			"quantized": true,
			"type": "Manufactured Good",
			"volumeLitersPerUnit": "1.725"
		},
		{
			"category": "Fabric",
			"id": "128",
			"massKilogramsPerUnit": "1",
			"name": "Carbon Fiber",
			"quantized": false,
			"type": "Manufactured Good",
			"volumeLitersPerUnit": "1.75"
		},
		{
			"category": "Food",
			"id": "129",
			"massKilogramsPerUnit": "1",
			"name": "Food",
			"quantized": false,
			"type": "Manufactured Good",
			"volumeLitersPerUnit": "1.25"
		},
		{
			"category": "Mechanism",
			"id": "130",
			"massKilogramsPerUnit": "6",
			"name": "Small Propellant Tank",
			"quantized": true,
			"type": "Manufactured Good",
			"volumeLitersPerUnit": "87"
		},
		{
			"category": "Refined Glass",
			"id": "131",
			"massKilogramsPerUnit": "1",
			"name": "Borosilicate Glass",
			"quantized": false,
			"type": "Refined Material",
			"volumeLitersPerUnit": "0.595"
		},
		{
			"category": "Mechanism",
			"id": "132",
			"massKilogramsPerUnit": "1",
			"name": "Ball Bearing",
			"quantized": false,
			"type": "Manufactured Good",
			"volumeLitersPerUnit": "0.212"
		},
		{
			"category": "Mechanism",
			"id": "133",
			"massKilogramsPerUnit": "2000",
			"name": "Large Thrust Bearing",
			"quantized": true,
			"type": "Manufactured Good",
			"volumeLitersPerUnit": "8640"
		},
		{
			"category": "Nonmetal",
			"id": "134",
			"massKilogramsPerUnit": "1",
			"name": "Boron",
			"quantized": false,
			"type": "Refined Material",
			"volumeLitersPerUnit": "0.543"
		},
		{
			"category": "Refined Metal",
			"id": "135",
			"massKilogramsPerUnit": "1",
			"name": "Lithium",
			"quantized": false,
			"type": "Refined Material",
			"volumeLitersPerUnit": "3.77"
		},
		{
			"category": "Adhesive",
			"id": "136",
			"massKilogramsPerUnit": "1",
			"name": "Epoxy",
			"quantized": false,
			"type": "Manufactured Good",
			"volumeLitersPerUnit": "1.68"
		},
		{
			"category": "Oxide",
			"id": "137",
			"massKilogramsPerUnit": "1",
			"name": "Neodymium Oxide",
			"quantized": false,
			"type": "Refined Material",
			"volumeLitersPerUnit": "0.251"
		},
		{
			"category": "Oxide",
			"id": "138",
			"massKilogramsPerUnit": "1",
			"name": "Yttria",
			"quantized": false,
			"type": "Refined Material",
			"volumeLitersPerUnit": "0.363"
		},
		{
			"category": "Salt",
			"id": "139",
			"massKilogramsPerUnit": "1",
			"name": "Sodium Dichromate",
			"quantized": false,
			"type": "Refined Material",
			"volumeLitersPerUnit": "0.661"
		},
		{
			"category": "Grown Organic",
			"id": "140",
			"massKilogramsPerUnit": "1",
			"name": "Novolak Prepolymer Resin",
			"quantized": false,
			"type": "Crop",
			"volumeLitersPerUnit": "1.02"
		},
		{
			"category": "Alloy",
			"id": "141",
			"massKilogramsPerUnit": "1",
			"name": "Ferromolybdenum",
			"quantized": false,
			"type": "Refined Material",
			"volumeLitersPerUnit": "0.168"
		},
		{
			"category": "Salt",
			"id": "142",
			"massKilogramsPerUnit": "1",
			"name": "Ammonium Diuranate",
			"quantized": false,
			"type": "Refined Material",
			"volumeLitersPerUnit": "0.37"
		},
		{
			"category": "Salt",
			"id": "143",
			"massKilogramsPerUnit": "1",
			"name": "Ammonium Paratungstate",
			"quantized": false,
			"type": "Refined Material",
			"volumeLitersPerUnit": "0.435"
		},
		{
			"category": "Engine Part",
			"id": "144",
			"massKilogramsPerUnit": "300",
			"name": "Engine Bell",
			"quantized": true,
			"type": "Assembly",
			"volumeLitersPerUnit": "570"
		},
		{
			"category": "Hull Module",
			"id": "145",
			"massKilogramsPerUnit": "1500",
			"name": "Steel Truss",
			"quantized": true,
			"type": "Assembly",
			"volumeLitersPerUnit": "21000"
		},
		{
			"category": "Hull Module",
			"id": "146",
			"massKilogramsPerUnit": "600",
			"name": "Aluminium Hull Plate",
			"quantized": true,
			"type": "Assembly",
			"volumeLitersPerUnit": "50520"
		},
		{
			"category": "Hull Module",
			"id": "147",
			"massKilogramsPerUnit": "1000",
			"name": "Aluminium Truss",
			"quantized": true,
			"type": "Assembly",
			"volumeLitersPerUnit": "21100"
		},
		{
			"category": "Hull Module",
			"id": "148",
			"massKilogramsPerUnit": "5000",
			"name": "Cargo Module",
			"quantized": true,
			"type": "Assembly",
			"volumeLitersPerUnit": "347500"
		},
		{
			"category": "Hull Module",
			"id": "149",
			"massKilogramsPerUnit": "1850",
			"name": "Pressure Vessel",
			"quantized": true,
			"type": "Assembly",
			"volumeLitersPerUnit": "262700"
		},
		{
			"category": "Hull Module",
			"id": "150",
			"massKilogramsPerUnit": "3500",
			"name": "Propellant Tank",
			"quantized": true,
			"type": "Assembly",
			"volumeLitersPerUnit": "511000"
		},
		{
			"category": "Alloy",
			"id": "151",
			"massKilogramsPerUnit": "1",
			"name": "Stainless Steel",
			"quantized": false,
			"type": "Refined Material",
			"volumeLitersPerUnit": "0.14"
		},
		{
			"category": "Electronics",
			"id": "152",
			"massKilogramsPerUnit": "1",
			"name": "Bare Circuit Board",
			"quantized": false,
			"type": "Manufactured Good",
			"volumeLitersPerUnit": "0.417"
		},
		{
			"category": "Electronics",
			"id": "153",
			"massKilogramsPerUnit": "1",
			"name": "Ferrite-bead Inductor",
			"quantized": false,
			"type": "Manufactured Good",
			"volumeLitersPerUnit": "0.228"
		},
		{
			"category": "Mechanism",
			"id": "154",
			"massKilogramsPerUnit": "2",
			"name": "Core Drill Bit",
			"quantized": true,
			"type": "Manufactured Good",
			"volumeLitersPerUnit": "17.26"
		},
		{
			"category": "Mechanism",
			"id": "155",
			"massKilogramsPerUnit": "10",
			"name": "Core Drill Thruster",
			"quantized": true,
			"type": "Manufactured Good",
			"volumeLitersPerUnit": "100"
		},
		{
			"category": "Mechanism",
			"id": "156",
			"massKilogramsPerUnit": "72",
			"name": "Parabolic Dish",
			"quantized": true,
			"type": "Manufactured Good",
			"volumeLitersPerUnit": "11808"
		},
		{
			"category": "Electronics",
			"id": "157",
			"massKilogramsPerUnit": "8",
			"name": "Photovoltaic Panel",
			"quantized": true,
			"type": "Manufactured Good",
			"volumeLitersPerUnit": "52.64"
		},
		{
			"category": "Electronics",
			"id": "158",
			"massKilogramsPerUnit": "5",
			"name": "LiPo Battery",
			"quantized": true,
			"type": "Manufactured Good",
			"volumeLitersPerUnit": "3.16"
		},
		{
			"category": "Salt",
			"id": "159",
			"massKilogramsPerUnit": "1",
			"name": "Neodymium Trichloride",
			"quantized": false,
			"type": "Refined Material",
			"volumeLitersPerUnit": "0.404"
		},
		{
			"category": "Oxide",
			"id": "161",
			"massKilogramsPerUnit": "1",
			"name": "Chromia",
			"quantized": false,
			"type": "Refined Material",
			"volumeLitersPerUnit": "0.348"
		},
		{
			"category": "Adhesive",
			"id": "162",
			"massKilogramsPerUnit": "1",
			"name": "Photoresist Epoxy",
			"quantized": false,
			"type": "Manufactured Good",
			"volumeLitersPerUnit": "1.67"
		},
		{
			"category": "Oxide",
			"id": "163",
			"massKilogramsPerUnit": "1",
			"name": "Uranium Dioxide",
			"quantized": false,
			"type": "Refined Material",
			"volumeLitersPerUnit": "0.165"
		},
		{
			"category": "Refined Metal",
			"id": "164",
			"massKilogramsPerUnit": "1",
			"name": "Tungsten",
			"quantized": false,
			"type": "Refined Material",
			"volumeLitersPerUnit": "0.065"
		},
		{
			"category": "Ship Hull",
			"id": "165",
			"massKilogramsPerUnit": "44600",
			"name": "Shuttle Hull",
			"quantized": true,
			"type": "Assembly",
			"volumeLitersPerUnit": "16011400"
		},
		{
			"category": "Ship Hull",
			"id": "166",
			"massKilogramsPerUnit": "74200",
			"name": "Light Transport Hull",
			"quantized": true,
			"type": "Assembly",
			"volumeLitersPerUnit": "35987000"
		},
		{
			"category": "Hull Module",
			"id": "167",
			"massKilogramsPerUnit": "10000",
			"name": "Cargo Ring",
			"quantized": true,
			"type": "Assembly",
			"volumeLitersPerUnit": "1550000"
		},
		{
			"category": "Ship Hull",
			"id": "168",
			"massKilogramsPerUnit": "480400",
			"name": "Heavy Transport Hull",
			"quantized": true,
			"type": "Assembly",
			"volumeLitersPerUnit": "60530400"
		},
		{
			"category": "Powder",
			"id": "169",
			"massKilogramsPerUnit": "1",
			"name": "Tungsten Powder",
			"quantized": false,
			"type": "Manufactured Good",
			"volumeLitersPerUnit": "0.104"
		},
		{
			"category": "Propellant",
			"id": "170",
			"massKilogramsPerUnit": "1",
			"name": "Hydrogen Propellant",
			"quantized": false,
			"type": "Refined Material",
			"volumeLitersPerUnit": "13.3"
		},
		{
			"category": "Processed Metal",
			"id": "171",
			"massKilogramsPerUnit": "1",
			"name": "Stainless Steel Sheet",
			"quantized": false,
			"type": "Manufactured Good",
			"volumeLitersPerUnit": "0.15"
		},
		{
			"category": "Processed Metal",
			"id": "172",
			"massKilogramsPerUnit": "1",
			"name": "Stainless Steel Pipe",
			"quantized": false,
			"type": "Manufactured Good",
			"volumeLitersPerUnit": "1.2"
		},
		{
			"category": "Electro-optical",
			"id": "173",
			"massKilogramsPerUnit": "1",
			"name": "CCD",
			"quantized": false,
			"type": "Manufactured Good",
			"volumeLitersPerUnit": "0.084"
		},
		{
			"category": "Electronics",
			"id": "174",
			"massKilogramsPerUnit": "1",
			"name": "Computer Chip",
			"quantized": false,
			"type": "Manufactured Good",
			"volumeLitersPerUnit": "0.079"
		},
		{
			"category": "Tool",
			"id": "175",
			"massKilogramsPerUnit": "30",
			"name": "Core Drill",
			"quantized": true,
			"type": "Manufactured Good",
			"volumeLitersPerUnit": "107.1"
		},
		{
			"category": "Refined Rare Earth",
			"id": "176",
			"massKilogramsPerUnit": "1",
			"name": "Neodymium",
			"quantized": false,
			"type": "Refined Material",
			"volumeLitersPerUnit": "0.178"
		},
		{
			"category": "Refined Metal",
			"id": "178",
			"massKilogramsPerUnit": "1",
			"name": "Chromium",
			"quantized": false,
			"type": "Refined Material",
			"volumeLitersPerUnit": "0.174"
		},
		{
			"category": "Fluoride",
			"id": "179",
			"massKilogramsPerUnit": "1",
			"name": "Uranium Tetrafluoride",
			"quantized": false,
			"type": "Refined Material",
			"volumeLitersPerUnit": "0.271"
		},
		{
			"category": "Refined Volatile",
			"id": "180",
			"massKilogramsPerUnit": "1",
			"name": "Pure Nitrogen",
			"quantized": false,
			"type": "Refined Material",
			"volumeLitersPerUnit": "1.24"
		},
		{
			"category": "Crystal",
			"id": "181",
			"massKilogramsPerUnit": "1",
			"name": "Nd:YAG Laser Rod",
			"quantized": false,
			"type": "Manufactured Good",
			"volumeLitersPerUnit": "0.242"
		},
		{
			"category": "Alloy",
			"id": "182",
			"massKilogramsPerUnit": "1",
			"name": "Nichrome",
			"quantized": false,
			"type": "Refined Material",
			"volumeLitersPerUnit": "0.143"
		},
		{
			"category": "Electromechanical",
			"id": "183",
			"massKilogramsPerUnit": "1",
			"name": "Neodymium Magnet",
			"quantized": false,
			"type": "Manufactured Good",
			"volumeLitersPerUnit": "0.142"
		},
		{
			"category": "Fluoride",
			"id": "184",
			"massKilogramsPerUnit": "1",
			"name": "Unenriched Uranium Hexafluoride",
			"quantized": false,
			"type": "Refined Material",
			"volumeLitersPerUnit": "0.327"
		},
		{
			"category": "Fluoride",
			"id": "185",
			"massKilogramsPerUnit": "1",
			"name": "Highly Enriched Uranium Hexafluoride",
			"quantized": false,
			"type": "Refined Material",
			"volumeLitersPerUnit": "0.327"
		},
		{
			"category": "Electro-optical",
			"id": "186",
			"massKilogramsPerUnit": "1",
			"name": "Nd:YAG Laser",
			"quantized": false,
			"type": "Manufactured Good",
			"volumeLitersPerUnit": "0.385"
		},
		{
			"category": "Electronics",
			"id": "187",
			"massKilogramsPerUnit": "1",
			"name": "Thin-film Resistor",
			"quantized": false,
			"type": "Manufactured Good",
			"volumeLitersPerUnit": "0.179"
		},
		{
			"category": "Refined Fissile",
			"id": "188",
			"massKilogramsPerUnit": "1",
			"name": "Highly Enriched Uranium Powder",
			"quantized": false,
			"type": "Refined Material",
			"volumeLitersPerUnit": "0.096"
		},
		{
			"category": "Semi-refined",
			"id": "189",
			"massKilogramsPerUnit": "1",
			"name": "Leached Feldspar",
			"quantized": false,
			"type": "Refined Material",
			"volumeLitersPerUnit": "0.689"
		},
		{
			"category": "Semi-refined",
			"id": "190",
			"massKilogramsPerUnit": "1",
			"name": "Roasted Rhabdite",
			"quantized": false,
			"type": "Refined Material",
			"volumeLitersPerUnit": "0.321"
		},
		{
			"category": "Semi-refined",
			"id": "191",
			"massKilogramsPerUnit": "1",
			"name": "Rhabdite Slag",
			"quantized": false,
			"type": "Refined Material",
			"volumeLitersPerUnit": "0.561"
		},
		{
			"category": "Carbonate",
			"id": "192",
			"massKilogramsPerUnit": "1",
			"name": "Potassium Carbonate",
			"quantized": false,
			"type": "Refined Material",
			"volumeLitersPerUnit": "0.686"
		},
		{
			"category": "Fluoride",
			"id": "193",
			"massKilogramsPerUnit": "1",
			"name": "Hydrogen Heptafluorotantalate and Niobate",
			"quantized": false,
			"type": "Refined Material",
			"volumeLitersPerUnit": "0.397"
		},
		{
			"category": "Refined Metal",
			"id": "194",
			"massKilogramsPerUnit": "1",
			"name": "Lead",
			"quantized": false,
			"type": "Refined Material",
			"volumeLitersPerUnit": "0.11"
		},
		{
			"category": "Fluoride",
			"id": "195",
			"massKilogramsPerUnit": "1",
			"name": "Potassium Fluoride",
			"quantized": false,
			"type": "Refined Material",
			"volumeLitersPerUnit": "0.672"
		},
		{
			"category": "Fluoride",
			"id": "196",
			"massKilogramsPerUnit": "1",
			"name": "Potassium Heptafluorotantalate",
			"quantized": false,
			"type": "Refined Material",
			"volumeLitersPerUnit": "0.365"
		},
		{
			"category": "Refined Organic",
			"id": "197",
			"massKilogramsPerUnit": "1",
			"name": "Diepoxy Prepolymer Resin",
			"quantized": false,
			"type": "Refined Material",
			"volumeLitersPerUnit": "0.833"
		},
		{
			"category": "Refined Metal",
			"id": "199",
			"massKilogramsPerUnit": "1",
			"name": "Tantalum",
			"quantized": false,
			"type": "Refined Material",
			"volumeLitersPerUnit": "0.075"
		},
		{
			"category": "Grown Organic",
			"id": "200",
			"massKilogramsPerUnit": "1",
			"name": "PEDOT",
			"quantized": false,
			"type": "Crop",
			"volumeLitersPerUnit": "0.989"
		},
		{
			"category": "Electronics",
			"id": "201",
			"massKilogramsPerUnit": "1",
			"name": "Polymer Tantalum Capacitor",
			"quantized": false,
			"type": "Manufactured Good",
			"volumeLitersPerUnit": "0.256"
		},
		{
			"category": "Electronics",
			"id": "202",
			"massKilogramsPerUnit": "5",
			"name": "Surface Mount Device Reel",
			"quantized": true,
			"type": "Manufactured Good",
			"volumeLitersPerUnit": "8.55"
		},
		{
			"category": "Electronics",
			"id": "203",
			"massKilogramsPerUnit": "1",
			"name": "Circuit Board",
			"quantized": false,
			"type": "Manufactured Good",
			"volumeLitersPerUnit": "0.5"
		},
		{
			"category": "Electromechanical",
			"id": "204",
			"massKilogramsPerUnit": "3",
			"name": "Brushless Motor Stator",
			"quantized": true,
			"type": "Manufactured Good",
			"volumeLitersPerUnit": "0.906"
		},
		{
			"category": "Electromechanical",
			"id": "205",
			"massKilogramsPerUnit": "3",
			"name": "Brushless Motor Rotor",
			"quantized": true,
			"type": "Manufactured Good",
			"volumeLitersPerUnit": "1.308"
		},
		{
			"category": "Electromechanical",
			"id": "206",
			"massKilogramsPerUnit": "6",
			"name": "Brushless Motor",
			"quantized": true,
			"type": "Manufactured Good",
			"volumeLitersPerUnit": "1.572"
		},
		{
			"category": "Ship Part",
			"id": "207",
			"massKilogramsPerUnit": "816",
			"name": "Landing Leg",
			"quantized": true,
			"type": "Assembly",
			"volumeLitersPerUnit": "1876.8"
		},
		{
			"category": "Ship Part",
			"id": "208",
			"massKilogramsPerUnit": "144",
			"name": "Landing Auger",
			"quantized": true,
			"type": "Assembly",
			"volumeLitersPerUnit": "982.08"
		},
		{
			"category": "Electromechanical",
			"id": "209",
			"massKilogramsPerUnit": "8",
			"name": "Pump",
			"quantized": true,
			"type": "Manufactured Good",
			"volumeLitersPerUnit": "6.624"
		},
		{
			"category": "Electromechanical",
			"id": "210",
			"massKilogramsPerUnit": "75",
			"name": "Radio Antenna",
			"quantized": true,
			"type": "Manufactured Good",
			"volumeLitersPerUnit": "12150"
		},
		{
			"category": "Electro-optical",
			"id": "211",
			"massKilogramsPerUnit": "2",
			"name": "Fiber Optic Gyroscope",
			"quantized": true,
			"type": "Manufactured Good",
			"volumeLitersPerUnit": "0.118"
		},
		{
			"category": "Electro-optical",
			"id": "212",
			"massKilogramsPerUnit": "2",
			"name": "Star Tracker",
			"quantized": true,
			"type": "Manufactured Good",
			"volumeLitersPerUnit": "94.2"
		},
		{
			"category": "Electronics",
			"id": "213",
			"massKilogramsPerUnit": "1",
			"name": "Computer",
			"quantized": false,
			"type": "Manufactured Good",
			"volumeLitersPerUnit": "0.333"
		},
		{
			"category": "Electromechanical",
			"id": "214",
			"massKilogramsPerUnit": "160",
			"name": "Control Moment Gyroscope",
			"quantized": true,
			"type": "Manufactured Good",
			"volumeLitersPerUnit": "808"
		},
		{
			"category": "Electromechanical",
			"id": "215",
			"massKilogramsPerUnit": "300",
			"name": "Robotic Arm",
			"quantized": true,
			"type": "Manufactured Good",
			"volumeLitersPerUnit": "3600"
		},
		{
			"category": "Carbonate",
			"id": "217",
			"massKilogramsPerUnit": "1",
			"name": "Beryllium Carbonate",
			"quantized": false,
			"type": "Refined Material",
			"volumeLitersPerUnit": "0.833"
		},
		{
			"category": "Oxide",
			"id": "218",
			"massKilogramsPerUnit": "1",
			"name": "Beryllia",
			"quantized": false,
			"type": "Refined Material",
			"volumeLitersPerUnit": "0.509"
		},
		{
			"category": "Ceramic",
			"id": "219",
			"massKilogramsPerUnit": "1",
			"name": "Beryllia Ceramic",
			"quantized": false,
			"type": "Manufactured Good",
			"volumeLitersPerUnit": "0.414"
		},
		{
			"category": "Refined Volatile",
			"id": "220",
			"massKilogramsPerUnit": "1",
			"name": "Neon",
			"quantized": false,
			"type": "Refined Material",
			"volumeLitersPerUnit": "7.41"
		},
		{
			"category": "Engine Part",
			"id": "221",
			"massKilogramsPerUnit": "40",
			"name": "Heat Exchanger",
			"quantized": true,
			"type": "Assembly",
			"volumeLitersPerUnit": "25.44"
		},
		{
			"category": "Engine Part",
			"id": "222",
			"massKilogramsPerUnit": "290",
			"name": "Turbopump",
			"quantized": true,
			"type": "Assembly",
			"volumeLitersPerUnit": "220.11"
		},
		{
			"category": "Engine Part",
			"id": "224",
			"massKilogramsPerUnit": "190",
			"name": "Neon/Fuel Separator Centrifuge",
			"quantized": true,
			"type": "Assembly",
			"volumeLitersPerUnit": "63.46"
		},
		{
			"category": "Engine Part",
			"id": "225",
			"massKilogramsPerUnit": "100",
			"name": "Fuel Make-up Tank",
			"quantized": true,
			"type": "Assembly",
			"volumeLitersPerUnit": "23.4"
		},
		{
			"category": "Engine Part",
			"id": "226",
			"massKilogramsPerUnit": "250",
			"name": "Neon Make-up Tank",
			"quantized": true,
			"type": "Assembly",
			"volumeLitersPerUnit": "116.75"
		},
		{
			"category": "Engine Part",
			"id": "227",
			"massKilogramsPerUnit": "130",
			"name": "Lightbulb End Moderators",
			"quantized": true,
			"type": "Assembly",
			"volumeLitersPerUnit": "112.58"
		},
		{
			"category": "Engine Part",
			"id": "229",
			"massKilogramsPerUnit": "50",
			"name": "Fused Quartz Lightbulb Tube",
			"quantized": true,
			"type": "Assembly",
			"volumeLitersPerUnit": "396"
		},
		{
			"category": "Engine Part",
			"id": "230",
			"massKilogramsPerUnit": "1942",
			"name": "Reactor Plumbing Assembly",
			"quantized": true,
			"type": "Assembly",
			"volumeLitersPerUnit": "6991.2"
		},
		{
			"category": "Engine Part",
			"id": "231",
			"massKilogramsPerUnit": "18700",
			"name": "Flow Divider Moderator",
			"quantized": true,
			"type": "Assembly",
			"volumeLitersPerUnit": "18139"
		},
		{
			"category": "Engine Part",
			"id": "232",
			"massKilogramsPerUnit": "180",
			"name": "Nuclear Lightbulb",
			"quantized": true,
			"type": "Assembly",
			"volumeLitersPerUnit": "583.2"
		},
		{
			"category": "Engine Part",
			"id": "233",
			"massKilogramsPerUnit": "6000",
			"name": "Composite-overwrapped Reactor Shell",
			"quantized": true,
			"type": "Assembly",
			"volumeLitersPerUnit": "51600"
		},
		{
			"category": "Engine Part",
			"id": "234",
			"massKilogramsPerUnit": "30000",
			"name": "Closed-cycle Gas Core Nuclear Reactor Engine",
			"quantized": true,
			"type": "Assembly",
			"volumeLitersPerUnit": "54600"
		},
		{
			"category": "Integration Module",
			"id": "235",
			"massKilogramsPerUnit": "2200",
			"name": "Habitation Module",
			"quantized": true,
			"type": "Assembly",
			"volumeLitersPerUnit": "264000"
		},
		{
			"category": "Integration Module",
			"id": "236",
			"massKilogramsPerUnit": "2000",
			"name": "Mobility Module",
			"quantized": true,
			"type": "Assembly",
			"volumeLitersPerUnit": "4860"
		},
		{
			"category": "Integration Module",
			"id": "237",
			"massKilogramsPerUnit": "3600",
			"name": "Fluids Automation Module",
			"quantized": true,
			"type": "Assembly",
			"volumeLitersPerUnit": "399600"
		},
		{
			"category": "Integration Module",
			"id": "238",
			"massKilogramsPerUnit": "3600",
			"name": "Solids Automation Module",
			"quantized": true,
			"type": "Assembly",
			"volumeLitersPerUnit": "11736"
		},
		{
			"category": "Integration Module",
			"id": "239",
			"massKilogramsPerUnit": "960",
			"name": "Terrain Interface Module",
			"quantized": true,
			"type": "Assembly",
			"volumeLitersPerUnit": "2976"
		},
		{
			"category": "Integration Module",
			"id": "240",
			"massKilogramsPerUnit": "500",
			"name": "Avionics Module",
			"quantized": true,
			"type": "Assembly",
			"volumeLitersPerUnit": "12200"
		},
		{
			"category": "Integration Module",
			"id": "241",
			"massKilogramsPerUnit": "6665",
			"name": "Escape Module",
			"quantized": true,
			"type": "Assembly",
			"volumeLitersPerUnit": "339915"
		},
		{
			"category": "Integration Module",
			"id": "242",
			"massKilogramsPerUnit": "660",
			"name": "Attitude Control Module",
			"quantized": true,
			"type": "Assembly",
			"volumeLitersPerUnit": "2976.6"
		},
		{
			"category": "Integration Module",
			"id": "243",
			"massKilogramsPerUnit": "1000",
			"name": "Power Module",
			"quantized": true,
			"type": "Assembly",
			"volumeLitersPerUnit": "3800"
		},
		{
			"category": "Integration Module",
			"id": "244",
			"massKilogramsPerUnit": "1000",
			"name": "Thermal Module",
			"quantized": true,
			"type": "Assembly",
			"volumeLitersPerUnit": "399"
		},
		{
			"category": "Integration Module",
			"id": "245",
			"massKilogramsPerUnit": "32000",
			"name": "Propulsion Module",
			"quantized": true,
			"type": "Assembly",
			"volumeLitersPerUnit": "106560"
		},
		{
			"category": "",
			"id": "S1",
			"massKilogramsPerUnit": "185525",
			"name": "Light Transport",
			"quantized": true,
			"type": "Ship",
			"volumeLitersPerUnit": "0"
		},
		{
			"category": "",
			"id": "S2",
			"massKilogramsPerUnit": "969525",
			"name": "Heavy Transport",
			"quantized": true,
			"type": "Ship",
			"volumeLitersPerUnit": "0"
		},
		{
			"category": "",
			"id": "S3",
			"massKilogramsPerUnit": "100755",
			"name": "Shuttle",
			"quantized": true,
			"type": "Ship",
			"volumeLitersPerUnit": "0"
		},
		{
			"category": "",
			"id": "B1",
			"massKilogramsPerUnit": "0",
			"name": "Warehouse",
			"quantized": true,
			"type": "Building",
			"volumeLitersPerUnit": "0"
		},
		{
			"category": "",
			"id": "B2",
			"massKilogramsPerUnit": "0",
			"name": "Extractor",
			"quantized": true,
			"type": "Building",
			"volumeLitersPerUnit": "0"
		},
		{
			"category": "",
			"id": "B3",
			"massKilogramsPerUnit": "0",
			"name": "Refinery",
			"quantized": true,
			"type": "Building",
			"volumeLitersPerUnit": "0"
		},
		{
			"category": "",
			"id": "B4",
			"massKilogramsPerUnit": "0",
			"name": "Bioreactor",
			"quantized": true,
			"type": "Building",
			"volumeLitersPerUnit": "0"
		},
		{
			"category": "",
			"id": "B5",
			"massKilogramsPerUnit": "0",
			"name": "Factory",
			"quantized": true,
			"type": "Building",
			"volumeLitersPerUnit": "0"
		},
		{
			"category": "",
			"id": "B6",
			"massKilogramsPerUnit": "0",
			"name": "Shipyard",
			"quantized": true,
			"type": "Building",
			"volumeLitersPerUnit": "0"
		},
		{
			"category": "",
			"id": "B7",
			"massKilogramsPerUnit": "0",
			"name": "Spaceport",
			"quantized": true,
			"type": "Building",
			"volumeLitersPerUnit": "0"
		},
		{
			"category": "",
			"id": "B8",
			"massKilogramsPerUnit": "0",
			"name": "Marketplace",
			"quantized": true,
			"type": "Building",
			"volumeLitersPerUnit": "0"
		},
		{
			"category": "",
			"id": "B9",
			"massKilogramsPerUnit": "0",
			"name": "Habitat",
			"quantized": true,
			"type": "Building",
			"volumeLitersPerUnit": "0"
		}
	],
	"spectralTypes": [
		{
			"id": "1",
			"name": "C",
			"processes": [
				"1",
				"6",
				"7",
				"8",
				"9",
				"10",
				"11"
			]
		},
		{
			"id": "2",
			"name": "CM",
			"processes": [
				"1",
				"6",
				"7",
				"8",
				"9",
				"10",
				"11",
				"18",
				"19",
				"20",
				"21",
				"22"
			]
		},
		{
			"id": "3",
			"name": "CI",
			"processes": [
				"1",
				"2",
				"3",
				"4",
				"5",
				"6",
				"7",
				"8",
				"9",
				"10",
				"11"
			]
		},
		{
			"id": "4",
			"name": "CS",
			"processes": [
				"1",
				"6",
				"7",
				"8",
				"9",
				"10",
				"11",
				"12",
				"13",
				"14",
				"15",
				"16",
				"17"
			]
		},
		{
			"id": "5",
			"name": "CMS",
			"processes": [
				"1",
				"6",
				"7",
				"8",
				"9",
				"10",
				"11",
				"12",
				"13",
				"14",
				"15",
				"16",
				"17",
				"18",
				"19",
				"20",
				"21",
				"22"
			]
		},
		{
			"id": "6",
			"name": "CIS",
			"processes": [
				"1",
				"2",
				"3",
				"4",
				"5",
				"6",
				"7",
				"8",
				"9",
				"10",
				"11",
				"12",
				"13",
				"14",
				"15",
				"16",
				"17"
			]
		},
		{
			"id": "7",
			"name": "S",
			"processes": [
				"12",
				"13",
				"14",
				"15",
				"16",
				"17"
			]
		},
		{
			"id": "8",
			"name": "SM",
			"processes": [
				"12",
				"13",
				"14",
				"15",
				"16",
				"17",
				"18",
				"19",
				"20",
				"21",
				"22"
			]
		},
		{
			"id": "9",
			"name": "SI",
			"processes": [
				"1",
				"2",
				"3",
				"4",
				"5",
				"6",
				"7",
				"8",
				"12",
				"13",
				"14",
				"15",
				"16",
				"17"
			]
		},
		{
			"id": "10",
			"name": "M",
			"processes": [
				"18",
				"19",
				"20",
				"21",
				"22"
			]
		},
		{
			"id": "11",
			"name": "I",
			"processes": [
				"1",
				"2",
				"3",
				"4",
				"5",
				"6",
				"7",
				"8"
			]
		}
	]
}
