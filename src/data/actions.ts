export const Types = {
    "Gain": "arrow-up-thick",
    "Defense": "shield",
    "Bank": "bank",
    "Malice": "sword-cross",
    "Luck": "clover",
    "Help": "heart"
};
export const Actions: {[key: string]: any} = {
    "coll": { Type: "Gain", Icon: "account-group" },
    "bost": { Type: "Gain", Icon: "gold" },
    "yest": { Type: "Gain", Icon: "calendar-plus" },
    "cart": { Type: "Gain", Icon: "cart" },
    "gamb": { Type: "Gain", Icon: "cards" },
    "pris": { Type: "Gain", Icon: "asterisk" },
    "hold": { Type: "Defense", Icon: "pause-circle" },
    "cntr": { Type: "Defense", Icon: "knife-military" },
    "half": { Type: "Defense", Icon: "shield-half-full" },
    "boom": { Type: "Malice", Icon: "boomerang" },
    "down": { Type: "Malice", Icon: "trending-down" },
    "avrg": { Type: "Luck", Icon: "equalizer" },
    "dice": { Type: "Luck", Icon: "dice-multiple" },
    "rand": { Type: "Luck", Icon: "arrow-decision" },
    "dlay": { Type: "Luck", Icon: "camera-flip" },
    "rise": { Type: "Help", Icon: "trending-up" },
    "hart": { Type: "Help", Icon: "heart" },
    "bnki": { Type: "Bank", Icon: "bank-transfer-in" },
    "bnko": { Type: "Bank", Icon: "bank-transfer-out" },
    "part": { Type: "Bank", Icon: "circle-slice-1" },
    "bnkx": { Type: "Bank", Icon: "bank-off" }
};