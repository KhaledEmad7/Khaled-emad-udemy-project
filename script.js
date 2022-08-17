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
  
  
let addCourses = () => {
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
        container.innerHTML += `
            <div class="img-container">
            <figure>
                <img class="course-img" src="${course.image}" alt="Course image">
                <figcaption class ="cap1">${course.title}</figcaption>
                <figcaption class ="cap2">${course.instructors[0].name}</figcaption>
                <i>4.6</i>
                <i class="fas fa-star" style="color: #f4c150"></i>
                <i class="fas fa-star" style="color: #f4c150"></i>
                <i class="fas fa-star" style="color: #f4c150"></i>
                <i class="fas fa-star" style="color: #f4c150"></i>
                <i class="fas fa-star-half-alt" style="color: #f4c150"></i>
                <figcaption class ="cap1">E£${course.price}</figcaption>
            </figure>
            </div>
        
        `
    });
};

let search_bar = document.querySelector("input");
search_bar.addEventListener("keyup", (e) => {
    filter = e.target.value;
    addCourses();
    e.preventDefault();
});