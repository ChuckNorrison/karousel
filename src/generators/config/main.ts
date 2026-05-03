console.log(`<?xml version="1.0" encoding="UTF-8"?>
<kcfg xmlns="http://www.kde.org/standards/kcfg/1.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.kde.org/standards/kcfg/1.0 http://www.kde.org/standards/kcfg/1.0/kcfg.xsd">
    <kcfgfile name="kwinrc" />
    <group name="">`);

for (const entry of configDef) {
    const choicesBlock = formatChoices(entry);
    console.log(`        <entry name="${entry.name}" type="${entry.type}">
            <default>${escapeXml(entry.default)}</default>${choicesBlock}
        </entry>`);
}

console.log(`    </group>
</kcfg>`);

function escapeXml(input: any) {
    if (typeof input === "string") {
        return input
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');
    } else {
        return input;
    }
}

function choiceDisplayLabel(entryName: string, value: string) {
    if (entryName === "multiMonitorMode") {
        if (value === "perScreen") {
            return "Per Screen (default)";
        }
        if (value === "cross") {
            return "Cross-Monitor Unified Grid";
        }
    }
    return value;
}

function formatChoices(entry: { name: string; enum?: string[] }) {
    const choices = entry.enum;
    if (choices === undefined || choices.length === 0) {
        return "";
    }
    let out = "\n            <choices>";
    for (const value of choices) {
        const label = choiceDisplayLabel(entry.name, value);
        out += `\n                <choice name="${escapeXml(value)}">${escapeXml(label)}</choice>`;
    }
    out += "\n            </choices>";
    return out;
}
