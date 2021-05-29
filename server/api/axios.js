const axios = require('axios')
const qs = require('qs')
const key = require('../config/auth.config')

/**
  @desc imgurAPI 第三方圖片空間 imgur
*/
async function imgurAPI (image) {
      let imgUrl = ''
        let data = qs.stringify({
          'image': image,
          'type': 'base64'
        })
        const config = {
          method: 'post',
          url: key.imgURl,
          headers: {
            'Authorization': `Client-ID ${key.IMGUR_CUSTOMER_KEY}`,
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          data : data
        }
        await axios(config)
        .then(function (response) {
          if (response.data.status === 200) {
            imgUrl = response.data.data.link
          }
        })
        .catch(function (error) {
          console.log('error:', error)
        })
        return imgUrl
}

module.exports = imgurAPI