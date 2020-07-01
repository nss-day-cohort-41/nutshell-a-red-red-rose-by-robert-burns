import EventListeners from '../EventListeners.js';
import data from '../main.js';

let friendObj;
export default function CommentsTemplate(arr){
    let html = ``;
    friendObj = trackFriends(data.friends);
    html = commentsGenerator(arr)
    html += commentInput();
    renderComments(html);
    EventListeners.saveCommentEvent();
    EventListeners.editDeleteComment();
    EventListeners.addFriendCommentEvent();

}
const trackFriends=(list)=>{
  let obj = {};
  for(let i = 0; i < list.length; i++){
    obj[list[i].userId] = list[i].userId
  }
  console.log(obj, "friends obj")
  return obj;
}

const renderComments=(html)=>{
    document.querySelector(".bottom-section").innerHTML = html 
}
const commentsGenerator =(arr)=>{
  let html = ``;
  for(let i = 0; i < arr.length; i++){
    html += commentCard(arr[i]);
  }
  return html;
}
const commentCard= (obj)=>{
  console.log(obj, window.sessionStorage.activeUser)
  let html = `
  <div class="card text-center">
  <div class="card-header"></div>
  ${ obj.userId != window.sessionStorage.activeUser && !friendObj[obj.userId] ?`<button type="button" id="add-friend-comment" name=${obj.userId}>Add Friend</button>` : "" }
  <div class="card-body">
    <h5 class="card-title">${window.sessionStorage.activeUser}</h5>
    <p class="card-text">${obj.comment}</p>
  </div>
  ${obj.userId == window.sessionStorage.activeUser ? `<button type="button" name=${obj.id} id="edit-comment-btn">Edit</button><button type="button" name=${obj.id} id="delete-comment-btn">Delete</button>` : ""}
  <div class="card-footer text-muted"></div>
</div>
<hr/>
`
return html;
}
const commentInput = () =>{
  return ` <section class="enter-chat-message">
  <div class="input-group">
      <div class="input-group-prepend">
        <span class="input-group-text">What's on your mind?</span>
      </div>
      <textarea id="comment-text-input" class="form-control user-text" aria-label="What's on your mind?"></textarea>
      <button type="button" id="save-comment-btn" class="btn btn-secondary">Submit</button>
    </div>
    <hr/>
 
</section>`
}
