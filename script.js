let courses = []
let filter = ""

fetch("http://localhost:3000/body")
  .then((res) => res.json())
  .then((data) => {
    addCourses(data)
  })
  .catch((err) => console.log(err));
  
  
let addCourses = (data) => {
    courses = []
    filter = input.value;
    data.courses.forEach((course) => {
        if (course.title.toLowerCase().includes(filter.toLocaleLowerCase())) {
            courses.push(course);
        }
    });
    let container = document.querySelector(".courses-container")
    courses.forEach((course) => {
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

let input = document.querySelector("input");
input.addEventListener("keyup", (e) => {
    filter = e.target.value;
    applyCourse();
    e.preventDefault();
});