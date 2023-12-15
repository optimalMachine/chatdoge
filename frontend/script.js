document.addEventListener('DOMContentLoaded', function() {
    displayMessage('안녕! 이름은 좀 웃기지만 난 시바운명! 운세를 알려줄수 있어. 너의 생년월일이 뭐야?', '시바운명');
});

document.getElementById('send-button').addEventListener('click', sendMessage);

// 사용자가 '보내기' 버튼을 클릭할 때 호출되는 함수
function sendMessage() {
    const input = document.getElementById('message-input'); // 입력 필드 가져오기
    const message = input.value; // 입력 필드의 값(메시지) 가져오기
    input.value = ''; // 입력 필드 초기화

    if (message) {
        displayMessage(message, '사용자'); // 사용자 메시지 화면에 표시
        getFortune(message); // getFortune 함수 호출하여 서버에 메시지 전송
    }
}

// 서버에 운세 요청을 보내고 응답을 받는 함수
async function getFortune(message) {
    try {
        // 서버로 POST 요청 보내기
        const response = await fetch('http://localhost:3000/fortuneTell', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message: message }) // 메시지를 JSON 형태로 변환하여 전송
        });

        // 서버 응답이 정상이 아닐 경우 에러 처리
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        // 서버로부터 받은 데이터를 JSON 형식으로 변환
        const data = await response.text();
        displayMessage(data, '시바운명'); // 서버 응답을 화면에 표시
    } catch (error) {
        console.error('Error:', error); // 콘솔에 에러 로깅
        displayMessage('잠깐... 뭔가 문제가 있는거 같은데..??', '시바운명'); // 에러 메시지 표시
    }
}


function displayMessage(message, sender) {
    const chatBox = document.getElementById('chat-box');
    const messageElement = document.createElement('div');
    messageElement.innerHTML = `<br> <strong>${sender}:</strong> ${message} <br>`;
    messageElement.className = sender === '사용자' ? 'user-message' : 'bot-message';
    chatBox.appendChild(messageElement);

    chatBox.scrollTop = chatBox.scrollHeight; // 채팅 창 스크롤을 최신 메시지로 이동
}
