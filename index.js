const express = require('express')
const app = express()

const axios = require('axios')
const JSDOM = require('jsdom').JSDOM
const FormData = require('form-data')
const querystring = require('querystring')
app.use(express.json())

app.get('/', (req, res) => {
  res.redirect('https://www.github.com/tastycode/query_selector_api')
})

app.post('/api/query_selector', async (req, res) => {

  try {
    const { method, url, data: jsonData, params, selector, formData } = req.body
    let data
    if (formData) {
      data = querystring.stringify(formData)
    } else {
      data = jsonData
    }
    const requestConfig = { method, url, data, params }
    const fetchedResponse = await axios({ method, url, data, params })
    const dom = new JSDOM(fetchedResponse.data)
    const queryResult = dom.window.document.querySelector(selector)
    if (queryResult) {
      const { innerHTML, innerText } = queryResult
      const response = {
        data: {
          type: "querySelectorResult",
          attributes: {
            innerText: queryResult.innerText,
            innerHTML
          }
        }
      }
      res.json(response)
    } else {
      res.status(404).end()
    }
  } catch (e) {
    let errorResponse = {
      errors: [{
        status: 422,
        title: e.message
      }]
    }
    res.status(422).json(errorResponse)
  }
})

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Express running on port ${port}`))
