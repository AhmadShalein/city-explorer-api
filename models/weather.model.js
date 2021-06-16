// Modeling the data
class Forecast {
    constructor(data,description){
        this.data= data;
        this.description = description;
    }
}
// we are exporting the model, making it visible to the other files
module.exports = Forecast;
// export default