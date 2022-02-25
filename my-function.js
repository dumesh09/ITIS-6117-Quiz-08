exports.handler = async (event) => {
let keyword = "";
       if(event.queryStringParameters && event.queryStringParameters.keyword){
           keyword = event.queryStringParameters.keyword;
       }
       else{
           keyword = 'you forgot to give keyword';
       }

        let responseBody = {
        statusCode: 200,
        body: JSON.stringify('Deeksha says ' + keyword)
    };
    
    return responseBody;
}