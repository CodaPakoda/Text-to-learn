const groq = require("../config/ai");

const {
    generateCourseStructurePrompt,
    generateChapterContentPrompt
} = require("./promptService");

function cleanJSON(text) {

    text = text
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();

    const start = text.indexOf("{");
    const end = text.lastIndexOf("}");

    if (start !== -1 && end !== -1) {
        text = text.substring(start, end + 1);
    }

    return text;
}
async function generateCourseStructure(
    title,
    description,
    difficulty,
    duration
) {
    try {
        const prompt = generateCourseStructurePrompt(
            title,
            description,
            difficulty,
            duration
        );

        const completion = await groq.chat.completions.create({
            model: "llama-3.3-70b-versatile",
            messages: [
                {
                    role: "user",
                    content: prompt
                }
            ],
            temperature: 0.3
        });

        const text = completion.choices[0].message.content;

        const cleanedText = cleanJSON(text);

        return JSON.parse(cleanedText);
    }
    catch (err) {
        console.error(err);
        throw new Error("Failed to generate course structure.");
    }
}

async function generateChapterContent(
    courseTitle,
    moduleTitle,
    chapterTitle,
    difficulty
) {
    try {
        const prompt = generateChapterContentPrompt(
            courseTitle,
            moduleTitle,
            chapterTitle,
            difficulty
        );

        const completion = await groq.chat.completions.create({
            model: "llama-3.3-70b-versatile",
            messages: [
                {
                    role: "user",
                    content: prompt
                }
            ],
            temperature: 0.3
        });

        const text = completion.choices[0].message.content;

        const cleanedText = cleanJSON(text);

        return JSON.parse(cleanedText);
    }
    catch (err) {
        console.error(err);
        throw new Error("Failed to generate chapter content.");
    }
}

module.exports = {
    generateCourseStructure,
    generateChapterContent
};