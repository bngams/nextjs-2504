import connection from "@/lib/mysql";

export async function findCategory(categoryID: number | string) {
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