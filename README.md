# querySelector API

This API accepts a URL and request configuration, along with a
`querySelector`-compatible selector, and returns the `innerHTML` and `innerText` at that result.

I made this because I wanted to create an automator task to convert selected text from simplified mandarin to pinyin.

## Example CURL request

You should be able to import this into
[Postman](https://www.getpostman.com)

```
curl -X POST \
  http://localhost:3000/api/query_selector \
  -H 'Content-Type: application/json' \
  -d '{
	"method": "POST",
	"url": "https://www.chineseconverter.com/en/convert/chinese-to-pinyin",
	"formData": {
		"text": "开玩 笑",
		"type": 0
	},
	"selector": "form[name=conversion] .row-fluid:nth-of-type(1) > div:nth-of-type(2) .span12 .row-fluid .span12"
}'
```

## Example Request

```json
{
	"method": "POST",
	"url": "https://www.chineseconverter.com/en/convert/chinese-to-pinyin",
	"formData": {
		"text": "开玩 笑",
		"type": 0
	},
	"selector": "form[name=conversion] .row-fluid:nth-of-type(1) > div:nth-of-type(2) .span12 .row-fluid .span12"
}
```

The API uses `axios` to make the request, and does not run any
javascript. The params `method`, `url`, `data`, and `params` are
passed directly to axios. When you pass `data`, the request is
submitted with `Content-Type` as `application/json`. If you pass
`formData`, the request will be made with
`application/x-www-form-urlencoded`.

## Example Response
```json
{
    "data": {
        "type": "querySelectorResult",
        "attributes": {
            "innerHTML": "kāi wán &nbsp; xiào "
        }
    }
}
```

## Errors

The API will return a 404 if the querySelector returns nothing.

If
the initial scrape request fails, the server will return a 422 with a
description of the error. For example

```json
{
    "errors": [
        {
            "status": 422,
            "title": "The string \"form[name=@#!~!!!conversion] .row-fluid:nth-of-type(1) > div:nth-of-type(2) .span12 .row-fluid .span12\", is not a valid CSS selector"
        }
    ]
}

```
## Running


`yarn start`

## Deploying to heroku

Since the app declares a start script and accepts a `PORT` environment
variable, the app simply needs to be pushed to heroku.


## Roadmap

This was a super fast project to make my mandarin practice smoother.
Given how often many people try to automate repetitive tasks, I
was surprised a service like this didn't already exist.

This would be a neat project for someone easily contribute to
their open-source portfolio. Here's some things you could do:

- [ ] Support running JS with headless chrome
- [ ] Prevent abuse
- [ ] Allow array results with 
  `querySelectorAll`
- [ ] Support mapping queryResults into custom response format
