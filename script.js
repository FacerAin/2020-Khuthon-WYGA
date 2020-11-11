const wallpaper = require('wallpaper');
let page_idx = 0
let question_test_lst = [{
    problem_no : 0,
    question_text: '자연어처리는 CV보다 우월한가?',
    answer_A_text: '맞다.',
    anwser_A_img: './img/1/A.jpg',
    answer_B_img: './img/1/B.jpg',
    answer_B_text: '아니다.',
    answer: 'A',
}]
$(function(){

    console.log(question_test_lst)
    setFirstPage()
    setWallpaper()


    
})

const setFirstPage = () => {
    page_idx = 0
    $('.question_text').text(question_test_lst[page_idx]['question_text'])
    $('.text_A').text(question_test_lst[page_idx]['answer_A_text'])
    $('.text_B').text(question_test_lst[page_idx]['answer_B_text'])
}

const clickA = () => {

}

const clickB = () => {
    
}

const setWallpaper = async () => {
    await wallpaper.set('./psyduck.jpg');
 
    await wallpaper.get();
    //=> '/Users/sindresorhus/unicorn.jpg'
};