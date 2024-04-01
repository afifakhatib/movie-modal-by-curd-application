let cl = console.log;

const addModal = document.getElementById('addModal');
const movieModal = document.getElementById('movieModal');
const backdrop = document.getElementById('backdrop');
const movieForm = document.getElementById('movieForm');
const closeModal = [...document.getElementsByClassName('closeModal')]
const title = document.getElementById('title')
const imgUrl = document.getElementById('imgUrl')
const overview = document.getElementById('overview')
const rating = document.getElementById('rating')
const movieContainer = document.getElementById('movieContainer');
const updatebtn = document.getElementById('updatebtn')
const submitbtn = document.getElementById('submitbtn')

const uuid = () => {
     return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g , function(c){
        let r = Math.random() * 16 | 0,
        v = c == 'x' ? r : (r & 0 * 3 | 0*8);
        return v.toString(16);
     })
}

// let uuid1 = uuid();
// cl(uuid1)

let movieArr = [];

const onTemplating = (arr) => {
    let card = `` ;
    arr.forEach(movie => {
        card += `
        <div class="col-md-4">
        <div class="card mb-4">
          <figure class="movieCard" id="${movie.movieId}">
             <img src="${movie.imgUrl}" alt="${movie.title}" title="${movie.title}">
             <figcaption>
                 <div class="ratingSection">
                     <div class="row">
                         <div class="col-md-9">
                            <h3>${movie.title}</h3> 
                         </div>
                         <div class="col-md-3">
                            <div class="rating">
                             ${movie.rating > 4 ? `<span class="bg-success"> ${movie.rating} </span>` :
                             movie.rating >= 2 && movie.rating <= 4 ?`<span class="bg-warning">
                             ${movie.rating}</span>` : `<span class="bg-danger">${movie.rating}</span>`}
                           </div>  
                         </div>
                     </div>
                 </div>
                 <div class="overViewSection">
                     <h4>${movie.title}</h4>
                     <em>OVERVIEW</em>
                     <p>${movie.overview}</p>
                     <span>
                    <button class="btn btn-primary" onclick="onEdit(this)">Edit</button>
                     </span>
                     <span class="text-right">
                     <button class="btn btn-danger" onclick="onDelete(this)">Delete</button>
                      </span>
                 </div>
             </figcaption>
          </figure>
        </div>
     </div>
              `
    })
    movieContainer.innerHTML = card;
}
// onTemplating(movieArr)

if(localStorage.getItem('movieArr')){
    movieArr = JSON.parse(localStorage.getItem('movieArr'));
    onTemplating(movieArr)
}

const onEdit = (ele) => {
    //  cl('edited')
     let editId = ele.closest('.movieCard').id;
     cl(editId);
     localStorage.setItem("editId", editId)
     let editObj = movieArr.find(objId => objId.movieId === editId)
     cl(editObj);
     onshowhideModal();
     title.value = editObj.title;
     imgUrl.value = editObj.imgUrl;
     overview.value = editObj.overview;
     rating.value = editObj.rating;
     submitbtn.classList.add('d-none')
     updatebtn.classList.remove('d-none')
}

const onMovieupdate = () => {
    updatebtn.classList.toggle('d-none')
   let updateId = localStorage.getItem("editId");
   let updatedobj = {
    title : title.value,
    imgUrl : imgUrl.value,
    overview : overview.value,
    rating : rating.value,
    movieId : updateId
   }
   cl(updatedobj)
   let getIndex = movieArr.findIndex(movie => movie.movieId === updateId);
   movieArr[getIndex] = updatedobj;
   swal.fire({
    title : `${updatedobj.title} movie is updated successfully !!!`,
    icon : "success",
    timer : 1500
   })
   onshowhideModal()
   updatebtn.classList.add('d-none')
}



// const onshowmodal = () => {
//     // cl('modal')
//     movieModal.classList.add('active');
//     backdrop.classList.add('active')
// }

// const oncloseModal = () => {
//      backdrop.classList.remove('active');
//      movieModal.classList.remove('active');
// }

const onshowhideModal = () => {
     backdrop.classList.toggle('active');
      movieModal.classList.toggle('active');
}

const createMoiveCard = (obj) => {
      let card = document.createElement('div');
      card.id = obj.movieid;
      card.className = "col-md-4";
      card.innerHTML = `
      <div class="card mb-4">
      <figure class="movieCard" id="${obj.movieId}">
         <img src="${obj.imgUrl}" alt="${obj.title}" title="${obj.title}">
         <figcaption>
             <div class="ratingSection">
                 <div class="row">
                     <div class="col-md-9">
                        <h3>${obj.title}</h3> 
                     </div>
                     <div class="col-md-3">
                     <div class="rating">
                     ${obj.rating > 4 ? `<span class="bg-success"> ${obj.rating} </span>` :
                     obj.rating >= 2 && obj.rating <= 4 ?`<span class="bg-warning">
                     ${obj.rating}</span>` : `<span class="bg-danger">${obj.rating}</span>`}
                   </div>  
                     </div>
                 </div>
             </div>
             <div class="overViewSection">
                 <h4>${obj.title}</h4>
                 <em>OVERVIEW</em>
                 <p>${obj.overview}</p>
                 <span>
                 <button class="btn btn-primary" onclick="onEdit(this)">Edit</button>
                  </span>
                  <span class="text-right">
                  <button class="btn btn-danger" onclick="onDelete(this)">Delete</button>
                   </span>
             </div>
         </figcaption>
      </figure>
    </div>
                    `
    movieContainer.prepend(card);                
}

const onMovieAddHandler = (e) => {
      e.preventDefault();
    //   cl('modal')
      let movieObj = {
        title : title.value,
        imgUrl: imgUrl.value,
        overview : overview.value,
        rating : rating.value,
        movieId : uuid()
      }
      cl(movieObj);
      movieArr.unshift(movieObj);
    //   cl(movieArr);
    localStorage.setItem('movieArr' , JSON.stringify(movieArr))
    // onTemplating(movieArr)
    createMoiveCard(movieObj)
      e.target.reset()
      onshowhideModal()
      swal.fire({
         title : `${movieObj.title} movie is added in collection !!!!`,
         icon : `success`,
         timer : 2000
      })
}

const onDelete = (ele) => {
    // cl('delete')
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then((result) => {
        if (result.isConfirmed) {
    let deleteId = ele.closest(".movieCard").id;
    cl(deleteId);
    let deleteIndexNo = movieArr.findIndex(movie => movie.movieId === deleteId);
    cl(deleteIndexNo)
    movieArr.splice(deleteIndexNo , 1)
    localStorage.setItem("movieArr", JSON.stringify(movieArr));
    ele.closest(".col-md-4").remove()
          Swal.fire({
            title: "Deleted!",
            text: `Your movie has been deleted.`,
            icon: "success",
            timer : 1500
          });
        }
      });
}


movieForm.addEventListener("submit", onMovieAddHandler);
addModal.addEventListener('click', onshowhideModal);
updatebtn.addEventListener('click' , onMovieupdate)
closeModal.forEach(hideall => 
    hideall.addEventListener('click' , onshowhideModal) );


