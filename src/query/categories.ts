import { PrismaClient } from "@/generated/prisma";
import connection from "@/lib/mysql";

export async function findOneCategory(categoryID: number | string) {
  // A simple SELECT query
  try {
    const [results] = await connection.query(
      'SELECT * FROM `categories` WHERE `id` = ?',
      [categoryID] // replace params ? with 1
    );

    return results; // results contains rows returned by server

  } catch (err) {
    console.log(err);
  }
}

// use prisma to get all categories
export async function findAllCategories() {
  // A simple SELECT query
  try {
    const prisma = new PrismaClient();
    const categories = await prisma.categories.findMany();
    return categories; // results contains rows returned by server

  } catch (err) {
    console.log(err);
  }
}