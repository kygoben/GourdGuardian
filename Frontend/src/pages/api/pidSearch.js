export default async function handler(req, res) {
  const { name, message } = req.body
  try {
    // await handleFormInputAsync({ name, message })
    res.status(200).json()
    // res.redirect(307, '/confirmPumpkin')
  } catch (err) {
    res.status(500).send({ error: 'failed to fetch data' })
  }
}