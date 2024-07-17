const commentsList = document.getElementById('comments');
let storedComments = [];

// 이전에 저장된 댓글 로드
if (localStorage.getItem('comments')) {
    storedComments = JSON.parse(localStorage.getItem('comments'));
    storedComments.forEach(comment => {
        addCommentToList(comment);
    });
}

// 댓글 폼 제출 이벤트 리스너
document.getElementById('comment-form').addEventListener('submit', function(event) {
    event.preventDefault(); // 기본 동작 방지

    // 입력된 닉네임과 댓글 내용 가져오기
    const nickname = document.getElementById('nickname').value;
    const comment = document.getElementById('comment').value;
    const options = { year: '2-digit', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: false };
    const time = new Date().toLocaleString('ko-KR', options).replace(/(\d+)\. (\d+)\. (\d+), (\d+):(\d+)/, '$3.$2.$1 $4:$5');

    // 새 댓글 객체 생성
    const newComment = { nickname, comment, time };

    // 새 댓글 화면에 추가
    addCommentToList(newComment);

    // 새 댓글을 저장하고 로컬 스토리지 업데이트
    storedComments.push(newComment);
    localStorage.setItem('comments', JSON.stringify(storedComments));

    // 입력 필드 초기화
    document.getElementById('nickname').value = '';
    document.getElementById('comment').value = '';
});

// 댓글을 리스트에 추가하는 함수
function addCommentToList(comment) {
    const commentElement = document.createElement('div');
    commentElement.classList.add('comment');
    commentElement.innerHTML = `
        <span class="nickname">${comment.nickname}</span>
        <span class="time">${comment.time}</span><br>
        <span class="content">${comment.comment}</span>
        <div class="actions">
            <button onclick="editComment(this)">수정</button>
            <button onclick="deleteComment(this)">삭제</button>
        </div>
    `;
    commentsList.insertBefore(commentElement, commentsList.firstChild); // 댓글 입력 폼 위에 추가
}

// 댓글 수정 버튼 클릭 이벤트 핸들러
function editComment(button) {
    const li = button.parentElement.parentElement;
    const commentSpan = li.querySelector('span.content');
    const newComment = prompt('댓글을 수정하세요:', commentSpan.textContent);
    if (newComment !== null) {
        commentSpan.textContent = newComment;
        updateStoredComments();
    }
}

// 댓글 삭제 버튼 클릭 이벤트 핸들러
function deleteComment(button) {
    const li = button.parentElement.parentElement;
    if (confirm('정말로 삭제하시겠습니까?')) {
        li.remove();
        updateStoredComments();
    }
}

// 로컬 스토리지에 저장된 댓글 업데이트 함수
function updateStoredComments() {
    storedComments = [];
    document.querySelectorAll('.comment').forEach(commentElement => {
        const nickname = commentElement.querySelector('.nickname').textContent;
        const time = commentElement.querySelector('.time').textContent;
        const comment = commentElement.querySelector('.content').textContent;
        storedComments.push({ nickname, comment, time });
    });
    localStorage.setItem('comments', JSON.stringify(storedComments));
}
