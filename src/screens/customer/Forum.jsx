import Header from './Header';
import PopUp from '../Popup';
import '../../assets/style/style.css';
import forumIcon from '../../assets/discussion-svgrepo-com.svg';
import { useEffect, useState } from 'react';
import { api } from '../../data/API';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Home() {

    const data = [{
        custId: 1,
        title: "Sorting and prioritizing work", desription: `If you want to change the order of your written to-do list, you have to rewrite the whole thing. 
                    But with a to-do list app, you can easily drag and drop items. Not only that—most to-do 
                    list apps offer a way to track priority with custom tags. Digital to-do lists also allow you to set up recurring tasks, so 
                    you’ll never forget a weekly meeting again. Plus, to-do list apps support multiple views, so you can visualize your tasks the way that works best for you, be it in a list or a 
                    Kanban board.`, date: "11/04/2024", time: "14:20", image: "", responses: [{
            comment: "Yes", time: "14:21", date: "11/04/2024"
        }, { comment: "No", time: "15:21", date: "12/04/2024" }]
    },

    {
        custId: 2,
        title: "Impossible to lose", desription: `desktop is typically considered a focused medium – ie you’re at your computer, actively completing a task. Mobile however, tends to be passive – when using mobile we’re typically on the go, juggling numerous tasks at once and so to grab (and hold) someone’s attention, you need to make sure your survey is designed for people who aren’t dedicated only to that one task.`,
        date: "12/04/2024", time: "08:10", image: "https://www.pingplotter.com/themes/pingman/images/fix-your-network/svg/fyn-wanted.svg", responses: [{ comment: "Yes, comment", time: "10:21", date: "12/04/2024" }, { comment: "No comment", time: "15:21", date: "12/04/2024" }]
    },
    {
        custId: 1,
        title: "People are busy when on mobile", desription: `Unlike a handwritten to-do list, you can’t “lose” an online to-do list. You’ll always have access to the list—whether on your desktop, iPhone, iPad, or other smart devices—so you can jot down to-dos wherever you are.`,
        date: "12/04/2024", time: "08:10", image: "https://www.pingplotter.com/themes/pingman/images/fix-your-network/svg/fyn-wanted.svg", responses: [{ comment: "Yes, comment", time: "10:21", date: "12/04/2024" }, { comment: "No comment", time: "15:21", date: "12/04/2024" }]
    },
    ]

    const [Comments, setComments] = useState([]);
    const [CommentPopUp, setCommentPopUp] = useState(false);
    const [AddPopUp, setAddPopUp] = useState(false);
    const [AllCustomerIssues, setAllCustomerIssues] = useState([])
    const [CustomerIssues, setCustomerIssues] = useState([])

    const [Title, setTitle] = useState('');
    const [Description, setDescription] = useState('');
    const [Image, setImage] = useState(undefined);
    const [Comment, setComment] = useState('')


    const [MyTopicSelected, setMyTopicSelected] = useState(true);

    useEffect(() => {

        setAllCustomerIssues(data)
        setCustomerIssues(data.filter(values => {
            return values.custId === 1
        }))
    }, [])
    function handleAddPopup() {
        document.body.style.overflow = 'unset';
    }

    function handleImage(event) {
        setImage(event.target.files[0])
    }

    function mytopic() {
        setMyTopicSelected(true)
        setCustomerIssues(AllCustomerIssues.filter(values => {
            return values.custId === 1
        }))
    }

    function allTopics() {
        setMyTopicSelected(false)
        setCustomerIssues(AllCustomerIssues)
    }

    function view_comments(comments) {
        console.log(comments)
        setComments(comments)
        setCommentPopUp(true)
        document.body.style.overflow = 'hidden';
    }

    function add_issue() {
        var data = {
            Topic: Title,
            TopicDescription: Description,
            UserId: Number(localStorage.getItem('user_id'))
        }
        
        axios.post(api + "AddToForum", data).then((respond) => {
            console.log(respond)
            if(respond.data.success){
                toast.success(respond.data.message, {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
    
                setTimeout(() => {
                    window.location.reload();
                }, 5000)
                setAddPopUp(false)
            }
            else{
                toast.error(respond.data.message, {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            }
        }, err => {
            console.log(err)
        })
    }

    function submit_comment() {
        setCommentPopUp(false)
    }



    let view_post_comments = <div className='popup-comment'>
        <h6 id='cancel-popup' onClick={() => setCommentPopUp(false)}>X</h6>
        <h3 id='popup-label'>Comments</h3>
        <div className='commentlist'>
            {Comments.map((comment, xid) => (
                <div key={xid} className='post-comment'>
                    <label>{comment.date} {comment.time}</label><br />
                    <label className='comment'>{comment.comment}</label>
                </div>
            ))}
        </div>
        <div className='btn-comment'>
            <textarea type='text' className='form-control' onChange={(event) => setComment(event.target.value)} ></textarea>
            <button className='btn btn-primary' onClick={submit_comment}>Send</button>
        </div>
    </div>

    let add_topic = <div className='popup-comment'>
        <h6 id='cancel-popup' onClick={() => setAddPopUp(false)}>X</h6>
        <h3 id='popup-label'>Add Issue</h3>
        <div className='group-form'>
            <label>Title</label>
            <input type='text' className='form-control' onChange={(event) => setTitle(event.target.value)} />
        </div>
        <div className='group-form'>
            <label>Description</label>
            <textarea type='text' className='form-control' onChange={(event) => setDescription(event.target.value)}></textarea>
        </div>
        <div className='group-form'>
            <label>Image</label>
            <input type='file' className='form-control' onChange={(event) => handleImage(event)} />
        </div>
        <div className='group-form'>
            <button className='btn btn-primary' onClick={add_issue}>Add Issue</button>
        </div>
    </div>


    return (
        <div>
            <Header />
            <ToastContainer />
            <PopUp trigger={CommentPopUp} setTrigger={handleAddPopup}>{view_post_comments}</PopUp>
            <PopUp trigger={AddPopUp} setTrigger={handleAddPopup}>{add_topic}</PopUp>


            <div className='section'>
                <div id='btn-topics'>
                    <button className='btn btn-success' disabled={MyTopicSelected} onClick={mytopic}>My Topics</button>
                    <button className='btn btn-primary' disabled={!MyTopicSelected} onClick={allTopics}>All Topics</button>
                </div>
                <button className='btn btn-primary' style={{ margin: '20px' }} onClick={() => setAddPopUp(true)}>Add Issue</button>
                <div className='content'>
                    <div className='left'>
                        {CustomerIssues.map((post, xid) => (
                            <div className='forum-topic' key={xid}>
                                <h4 className=''>{post.title}</h4>
                                <p>{post.desription}</p>
                                {post.image !== "" && <img src={post.image} alt={post.image} />}
                                <span>
                                    <button className='form-control' onClick={() => view_comments(post.responses)}>Responses ({post.responses.length})</button>
                                    <button className='form-control'>Liked (12)</button>
                                </span>
                            </div>
                        ))}

                    </div>
                    <div className='right'>
                        <img src={forumIcon} alt="" />
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Home;