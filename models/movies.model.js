// Modeling the data
class Movie {
    constructor(title, overview, averageVotes, totalVotes, imgUrl, popularity, releasedOn){
        this.title=title;
        this.overview=overview;
        this.average_votes=averageVotes;
        this.total_votes = totalVotes;
        this.image_url=imgUrl;
        this.popularity=popularity;
        this.released_on=releasedOn;
    }
}
// we are exporting the model, making it visible to the other files
module.exports = Movie;
// export default