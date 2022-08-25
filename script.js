let courses_data = []
let init_data = []
let filter = ""

fetch("http://localhost:3000/body")
  .then((res) => res.json())
  .then((data) => {
    init_data = data.courses
    addCourses()
  })
  .catch((err) => console.log(err));
  
  
const addCourses = () => {
    courses_data = []
    filter = search_bar.value;
    init_data.forEach((course) => {
        if (course.title.toLowerCase().includes(filter.toLocaleLowerCase())) {
            courses_data.push(course);
        }
    });
    let container = document.querySelector(".courses-container")
    container.innerHTML = ''
    courses_data.forEach((course) => {
        let rating = course.rating.toPrecision(2);
        let stars = "";
        for(let count = 1; count<=5; count++){
            if(count < rating)
            stars += `<i class="fas fa-star" style="color: #f4c150"></i>\n`
            else if(rating != Math.floor(rating)){
                stars += `<i class="fas fa-star-half-alt" style="color: #f4c150"></i>\n`
                rating = Math.floor(rating)
            }
            else
                stars += `<i class="fas fa-star" style="color: lightgray"></i>\n`
        }
        container.innerHTML += `
            <div class="img-container">
            <figure>
                <img class="course-img" src="${course.image}" alt="Course image">
                <figcaption class ="cap1">${course.title}</figcaption>
                <figcaption class ="cap2">${course.instructors[0].name}</figcaption>
                <i>${course.rating.toPrecision(2)}</i>
                ${stars}
                <figcaption class ="cap1">E£${course.price}</figcaption>
            </figure>
            </div>
        
        `
    });
};

const search_bar = document.querySelector("input");
search_bar.addEventListener("keyup", (e) => {
    filter = e.target.value;
    addCourses();
    e.preventDefault();
});