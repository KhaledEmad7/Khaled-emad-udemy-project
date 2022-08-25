let active_course = document.querySelector(".pressed");
let courses_data = []
let init_data = []
let filter = ""

fetch("http://localhost:3000/body")
  .then((res) => res.json())
  .then((data) => {
    init_data = data
    addCourses()
  })
  .catch((err) => console.log(err));
  
  
const addCourses = () => {
    courses_data = []
    filter = search_bar.value;
    init_data[active_course.textContent].courses.forEach((course) => {
        if (course.title.toLowerCase().includes(filter.toLocaleLowerCase())) {
            courses_data.push(course);
        }
    });
    let container = document.querySelector(".carousel-inner")
    container.innerHTML = ''
    
    let idx = 0;
    for(let cur = 0; cur<courses_data.length/5; cur++){
        let cnt = 0;
        let add = "";
        while(cnt<5){
            cnt++;
            if(idx>=courses_data.length){
                add += `<div class="card"></div>`
                continue;
            }
            let course = courses_data[idx++];
            console.log(course.title);
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
            add += `
            <div class="card">
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
            </div>
            `
        }
        if(!cur)
            container.innerHTML +=  `
                <div class="carousel-item active">
                    <div class="cards-wrapper">
                        ${add}
                    </div>
                </div>
            `
        else
            container.innerHTML +=  `
                <div class="carousel-item">
                    <div class="cards-wrapper">
                        ${add}
                    </div>  
                </div>
            `
    }
};

let clicked = document.querySelector(".courses-categories").children;

let onChangeCourse = (event) => {
    course = event.target;
    if (course != active_course) {
      active_course.classList.toggle("pressed");
      active_course.classList.toggle("norm");
      course.classList.toggle("pressed");
      course.classList.toggle("norm");
      active_course = course;
      addCourses();
    }
  };
  
  
for(let event of clicked) {
    event.addEventListener("click", onChangeCourse);
}
  


const search_bar = document.querySelector("input");
search_bar.addEventListener("keyup", (e) => {
    filter = e.target.value;
    addCourses();
    e.preventDefault();
});