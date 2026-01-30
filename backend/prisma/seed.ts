import "dotenv/config";
import { PrismaClient, QuestionType } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error("DATABASE_URL is not set");
}
const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

async function main() {
  const existing = await prisma.quiz.findFirst();
  if (existing) {
    console.log("Seed skipped: quizzes already exist.");
    return;
  }

  await prisma.quiz.create({
    data: {
      title: "Example Quiz",
      questions: {
        create: [
          {
            type: QuestionType.BOOLEAN,
            text: "The sky is blue.",
            order: 0,
            correctBoolean: true,
          },
          {
            type: QuestionType.INPUT,
            text: "What is the capital of France?",
            order: 1,
            correctText: "Paris",
          },
          {
            type: QuestionType.CHECKBOX,
            text: "Select all prime numbers.",
            order: 2,
            options: {
              create: [
                { text: "2", isCorrect: true, order: 0 },
                { text: "3", isCorrect: true, order: 1 },
                { text: "4", isCorrect: false, order: 2 },
                { text: "5", isCorrect: true, order: 3 },
              ],
            },
          },
        ],
      },
    },
  });

  console.log("Seed completed: example quiz created.");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
