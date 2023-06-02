const { Pool } = require('pg')
require('dotenv').config();


const pool = new Pool({
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  port: process.env.POSTGRES_PORT,
})

const getUsers = async () => {
  const client = await pool.connect()
  try {
    const result = await client.query('SELECT * FROM users')
    return result.rows.map(row => ({
        id: row.id,
        firstName: row.first_name,
        lastName: row.last_name,
        address: row.address,
        birthDate: row.birth_date,
        zipCode: row.zip_code,
        city: row.city,
      }))
  } finally {
    client.release()
  }
}

const deleteUser = async (id) => {
  const client = await pool.connect()
  try { 
    const result = await client.query('DELETE FROM users WHERE id = $1', [id])
    return result.rows.map(row => ({
      id: row.id,
      firstName: row.first_name,
      lastName: row.last_name,
      address: row.address,
      birthDate: row.birth_date,
      zipCode: row.zip_code,
      city: row.city,
    }))
  } finally {
    client.release()
  }
 }

 // updateUser
 const updateUser = async (id, body) => {
  const client = await pool.connect()
  try {
    const result = await client.query('UPDATE users SET first_name = $1, last_name = $2, address = $3, birth_date = $4, zip_code = $5, city = $6 WHERE id = $7', [body.firstName, body.lastName, body.address, body.birthDate, body.zipCode, body.city, id])
    return result.rows.map(row => ({
      id: row.id,
      firstName: row.first_name,
      lastName: row.last_name,
      address: row.address,
      birthDate: row.birth_date,
      zipCode: row.zip_code,
      city: row.city,
    }))
  } finally {
    client.release()
  }
 }

 const createUser = async (body) => {
  const client = await pool.connect()
  try {
    const result = await client.query('INSERT INTO users (first_name, last_name, address, birth_date, zip_code, city) VALUES ($1, $2, $3, $4, $5, $6)', [body.firstName, body.lastName, body.address, body.birthDate, body.zipCode, body.city])
    return result.rows.map(row => ({
      id: row.id,
      firstName: row.first_name,
      lastName: row.last_name,
      address: row.address,
      birthDate: row.birth_date,
      zipCode: row.zip_code,
      city: row.city,
    }))
  } finally {
    client.release()
  }
 }



module.exports = {
  getUsers,
  deleteUser,
  updateUser,
  createUser
}