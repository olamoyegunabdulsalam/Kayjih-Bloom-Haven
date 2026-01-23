
export const products = [
    // ===== 50-PIECES MONEY BOUQUET =====
    {
        id: 1,
        name: "50-PIECES MONEY BOUQUET",
        category: "Money Bouquet",
        type: "50-Pieces",
        description: "Elegant 50-piece money bouquet - perfect for small to medium celebrations",
        materials: {
            wrapper: "₦800 × 5 = ₦4,000",
            foam: "Half foam = ₦2,000",
            sticks: "50 pieces = ₦500",
            cellotape: "₦500",
            flower: "₦500",
            birthdayCard: "₦1,500",
            bow: "₦1,000",
            clip: "₦1,000",
            ribbon: "₦200",
            collection: "Bank collection + transport = ₦3,500",
            totalMaterials: "₦14,200",
            workmanship: "₦8,000"
        },
        pricing: [
            {
                noteValue: "₦200 notes",
                calculation: "₦200 × 50 = ₦10,000",
                total: "₦32,700"
            },
            {
                noteValue: "₦500 notes",
                calculation: "₦500 × 50 = ₦25,000",
                total: "₦47,700"
            },
            {
                noteValue: "₦1,000 notes",
                calculation: "₦1,000 × 50 = ₦50,000",
                total: "₦72,700"
            }
        ],
        features: [
            "Perfect for birthdays, anniversaries",
            "Includes birthday card",
            "Flower decoration included",
            "Professional wrapping",
            "Bank collection service"
        ],
        customizable: true,
        baseWhatsAppMessage: "Hello Kayjih Bloom Haven 👋\n\nI'm interested in the 50-PIECES MONEY BOUQUET.\n\nPlease provide details for my order. Thank you!"
    },

    // ===== 100-PIECES MONEY BOUQUET =====
    {
        id: 2,
        name: "100-PIECES MONEY BOUQUET",
        category: "Money Bouquet",
        type: "100-Pieces",
        description: "Grand 100-piece money bouquet - ideal for large celebrations and VIP events",
        materials: {
            wrapper: "₦800 × 9 = ₦7,200",
            foam: "Full foam = ₦4,000",
            sticks: "100 pieces = ₦1,000",
            cellotape: "₦1,500",
            flower: "₦500",
            birthdayCard: "₦1,500",
            bow: "₦1,000",
            clip: "₦1,000",
            ribbon: "₦200",
            collection: "Bank collection + transport = ₦4,500",
            totalMaterials: "₦22,900",
            workmanship: "₦12,000"
        },
        pricing: [
            {
                noteValue: "₦200 notes",
                calculation: "₦200 × 100 = ₦20,000",
                total: "₦54,400"
            },
            {
                noteValue: "₦500 notes",
                calculation: "₦500 × 100 = ₦50,000",
                total: "₦84,400"
            },
            {
                noteValue: "₦1,000 notes",
                calculation: "₦1,000 × 100 = ₦100,000",
                total: "₦134,400"
            }
        ],
        features: [
            "Perfect for weddings, corporate events",
            "Larger, more impressive display",
            "Includes birthday card",
            "Full foam base for stability",
            "Professional bank collection"
        ],
        customizable: true,
        baseWhatsAppMessage: "Hello Kayjih Bloom Haven 👋\n\nI'm interested in the 100-PIECES MONEY BOUQUET.\n\nPlease provide details for my order. Thank you!"
    },

    // ===== MONEY TOWER =====
    {
        id: 3,
        name: "MONEY TOWER",
        category: "Money Tower",
        type: "5-Layers",
        description: "Impressive 5-layer money tower with 200 pieces - the ultimate luxury display",
        materials: {
            collection: "Bank collection + transport",
            logo: "Happy Birthday logo = ₦2,500",
            rope: "Rope for assembly = ₦2,000",
            foam: "Foam + ball (rent) = ₦5,000",
            workmanship: "₦13,000"
        },
        note: "Five layers is not fixed — you can choose any number of layers.",
        pricing: [
            {
                noteValue: "₦200 notes",
                calculation: "₦200 × 200 = ₦40,000",
                collection: "₦6,500",
                total: "₦69,000"
            },
            {
                noteValue: "₦500 notes",
                calculation: "₦500 × 200 = ₦100,000",
                collection: "₦12,500",
                total: "₦135,000"
            },
            {
                noteValue: "₦1,000 notes",
                calculation: "₦1,000 × 200 = ₦200,000",
                collection: "₦22,500",
                total: "₦245,000"
            }
        ],
        features: [
            "5-layer impressive display",
            "Happy Birthday logo included",
            "Professional assembly",
            "Adjustable number of layers",
            "Perfect for grand celebrations"
        ],
        customizable: true,
        baseWhatsAppMessage: "Hello Kayjih Bloom Haven 👋\n\nI'm interested in the MONEY TOWER.\n\nPlease provide details for my order. Thank you!"
    },

    // ===== DECORATION PACKAGE =====
    {
        id: 4,
        name: "DECORATION PACKAGE",
        category: "Decoration",
        type: "Complete Setup",
        description: "Complete decoration package with all accessories - perfect for birthdays and celebrations",
        materials: {
            confetti: "₦2,500",
            normalBalloon: "Normal balloon = ₦3,500",
            shinyBalloon: "Shiny balloon = ₦4,500",
            ribbon: "Normal ribbon = ₦1,000",
            glue: "Balloon glue = ₦1,500",
            backdrop: "Backdrop = ₦2,500",
            foilBalloon: "Happy Birthday foil balloon = ₦3,000",
            birthdayCard: "₦1,500",
            sash: "Birthday sash = ₦2,000",
            fishingLine: "Fishing line = ₦1,000",
            numberBalloon: "Number balloon = ₦3,000",
            bentoCake: "Normal bento cake = ₦9,500"
        },
        workmanship: [
            { type: "Bunk bed", price: "₦8,000" },
            { type: "Normal bed with ceiling", price: "₦12,000" },
            { type: "Lake Tana (high ceiling)", price: "₦15,000" }
        ],
        pricing: [
            {
                option: "With Normal Balloon",
                total: " ₦21,500"
            },
            {
                option: "With Shiny Balloon",
                total: " ₦22,500"
            }
        ],
        features: [
            "Complete decoration setup",
            "Choice of balloon type",
            "Bento cake included",
            "Professional installation",
            "All accessories included",
            "Customizable design"
        ],
        customizable: true,
        note: "Workmanship depends on bed type and style complexity. Price can be reduced if you prefer simpler decoration. Delivery of cake included.",
        baseWhatsAppMessage: "Hello Kayjih Bloom Haven 👋\n\nI'm interested in the DECORATION PACKAGE.\n\nPlease provide details for my order. Thank you!"
    }
];

// Individual material prices for custom packages
export const individualMaterials = [
    { name: "Wrapper", price: "₦800", unit: "each" },
    { name: "Foam (Half)", price: "₦2,000", unit: "per bouquet" },
    { name: "Foam (Full)", price: "₦4,000", unit: "per bouquet" },
    { name: "Sticks (50 pieces)", price: "₦500", unit: "per set" },
    { name: "Sticks (100 pieces)", price: "₦1,000", unit: "per set" },
    { name: "Cellotape", price: "₦1,000", unit: "per roll" },
    { name: "Flower", price: "₦500", unit: "each" },
    { name: "Birthday Card", price: "₦1,500", unit: "each" },
    { name: "Bow", price: "₦1,000", unit: "each" },
    { name: "Clip", price: "₦1,000", unit: "each" },
    { name: "Ribbon", price: "₦200", unit: "per meter" }
];