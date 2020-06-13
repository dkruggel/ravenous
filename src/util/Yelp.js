const apiKey = 'xW6VL2AJHNezV6v9GyeXNQmHi6f76rR3ExZhUTC0ALwr9N3pSqXL2RDj1PFlJyjXBfwR5pjjGcw97TaRZWj-VitXIdkqG7NIprldTQAPiLYzjKiVBroWGzHoC97kXnYx'

const Yelp = {
    async Search(term, location, sortBy) {
        return fetch(`https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=${term}&location=${location}&sort_by=${sortBy}`,
                    {'headers':{'Authorization':`Bearer ${apiKey}`}})
                .then(response => {return response.json();})
                .then(jsonResponse => {
                    if (jsonResponse.businesses) {
                        return jsonResponse.businesses.map(business => {
                            return {
                                'id': business.id,
                                'imageSrc': business.image_url,
                                'name': business.name,
                                'address': `${business.location.address1} ${business.location.address2} ${business.location.address3}`,
                                'city': business.location.city,
                                'state': business.location.state,
                                'zipCode': business.location.zip_code,
                                'category': business.categories.map(category => {return `${category.title}`;}).join(', '),
                                'rating': business.rating,
                                'reviewCount': business.review_count
                            }
                        });
                    }
                });
    }
}

export default Yelp;