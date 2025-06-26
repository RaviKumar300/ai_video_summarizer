import './Body.css';
import vdo_plc from '../assets/video-placeholder.png';
import vdo_thumb from '../assets/vdo_thumb.jpg';
import vdo_logo from '../assets/vdo_logo.jpg';
import { useEffect, useState } from 'react';

function Body() {
    const [summaryData, setSummaryData] = useState(null);

    useEffect(() => {
        fetch('/response_summary.json')
            .then((res) => res.json())
            .then((data) => setSummaryData(data))
            .catch((err) => console.error('Error loading summary:', err));
    }, []);

    return (
        <div className="body">
            <div className="tool_heading">AI-Powered Video Summarizer</div>
            <div className="tool_desc">
                Effortlessly summarize videos with the power of AI. Paste a YouTube link or upload your own video — Quad Tools will generate a concise, intelligent summary for you.
            </div>

            <div className="input_area">
                <div className="left_input">
                    <label htmlFor="youtubeLink">YouTube Link</label>
                    <input type="text" id="youtubeLink" placeholder="Paste YouTube video link here..." />
                </div>

                <div className="divider">OR</div>

                <div className="right_input">
                    <label htmlFor="videoUpload">Upload Your Video</label>
                    <div className="upload_box">
                        <img src={vdo_plc} alt="video placeholder" />
                        <input type="file" id="videoUpload" accept="video/*" />
                        <button>Upload</button>
                    </div>
                </div>
            </div>

            {summaryData && (
                <div className="res_display">
                    <div className="res_left">
                        <div className="left_top">
                            <img src={vdo_thumb} alt="" />
                        </div>
                        <div className="left_mid">
                            <div className="vdo_heading">
                                {summaryData.video_title}
                            </div>
                            <div className="channel_info">
                                <img src={vdo_logo} alt="" />
                                <p>Veritasium</p>
                            </div>
                            <div className="vdo_info">
                                <b>Length: </b> 25:00 <br />
                                <b>Upload Date: </b> 1 Nov 2021 <br />
                                <b>Views: </b> 20M <br />
                                <b>Likes: </b> 700K
                            </div>
                        </div>
                    </div>

                    <div className="res_right">
                        <div className="summary">
                            <p><b>Short Summary: </b></p>
                            <p>
                                {summaryData.summary_title}
                            </p>
                        </div>
                        <hr />
                        <div className="time_summ">
                            <p><b>Summary with Time stamps: </b></p>
                            <table className="summary-table">
                                <thead>
                                    <tr>
                                        <th>Timestamp</th>
                                        <th>Description</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Object.entries(summaryData.summary_by_timestamps).map(
                                        ([timestamp, section], idx) => (
                                            <tr key={idx}>
                                                <td>{timestamp}</td>
                                                <td>{section.key_points}</td>
                                            </tr>
                                        )
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Body;

// import './Body.css';
// import vdo_plc from '../assets/video-placeholder.png'
// import vdo_thumb from '../assets/vdo_thumb.jpg'
// import vdo_logo from '../assets/vdo_logo.jpg'

// function Body() {
//     return (
//         <div className="body">
//             <div className="tool_heading">
//                 AI-Powered Video Summarizer
//             </div>
//             <div className="tool_desc">
//                 Effortlessly summarize videos with the power of AI. Paste a YouTube link or upload your own video —
//                 Quad Tools will generate a concise, intelligent summary for you.
//             </div>

//             <div className="input_area">
//                 <div className="left_input">
//                     <label htmlFor="youtubeLink">YouTube Link</label>
//                     <input type="text" id="youtubeLink" placeholder="Paste YouTube video link here..." />
//                 </div>

//                 <div className="divider">OR</div>

//                 <div className="right_input">
//                     <label htmlFor="videoUpload">Upload Your Video</label>
//                     <div className="upload_box">
//                         <img src={vdo_plc} alt="video placeholder" />
//                         <input type="file" id="videoUpload" accept="video/*" />
//                         <button>Upload</button>
//                     </div>
//                 </div>
//             </div>

//             <div className="res_display">
//                 <div className="res_left">
//                     <div className="left_top">
//                         <img src={vdo_thumb} alt="" />
//                     </div>
//                     <div className="left_mid">
//                         <div className="vdo_heading">
//                             How Imaginary Numbers Were Invented
//                         </div>
//                         <div className="channel_info">
//                             <img src={vdo_logo} alt="" />
//                             <p>Veritasium</p>
//                         </div>
//                         <div className="vdo_info">
//                             <b>Length: </b> 23:28 <br />
//                             <b>Upload Date: </b> 1 Nov 2021 <br />
//                             <b>Views: </b> 20M <br />
//                             <b>Likes: </b> 700K
//                         </div>
//                     </div>
//                 </div>
//                 <div className="res_right">
//                     <div className="summary">
//                         <p><b>Short Summary: </b></p>
//                         <p>
//                             Mathematicians spent millennia trying to solve the cubic equation, limited by their insistence on real-world interpretations of numbers and geometry. Progress came only when they embraced abstract concepts like negative and imaginary numbers—initially considered nonsensical. This shift led to the invention of complex numbers, allowing for a general solution to the cubic and laying the groundwork for modern algebra. Centuries later, these imaginary numbers emerged at the heart of quantum mechanics, showing that letting go of reality was essential to understanding it more deeply.
//                         </p>
//                     </div>
//                     <hr />
//                     <div className="time_summ">
//                         <p><b>Summary with Time stamps: </b></p>
//                         <table className="summary-table">
//                             <thead>
//                                 <tr>
//                                     <th>Timestamp</th>
//                                     <th>Description</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 <tr>
//                                     <td>00:00</td>
//                                     <td>Introduction to the history of mathematics and the origins of algebra and geometry. The cubic equation posed a long-unsolved challenge.</td>
//                                 </tr>
//                                 <tr>
//                                     <td>01:44</td>
//                                     <td>Ancient geometric methods to solve quadratics and why negative solutions weren't considered valid for centuries.</td>
//                                 </tr>
//                                 <tr>
//                                     <td>04:20</td>
//                                     <td>Omar Khayyam’s geometric attempts at solving cubics and his classification of 19 different cubic types.</td>
//                                 </tr>
//                                 <tr>
//                                     <td>05:31</td>
//                                     <td>Scipione del Ferro secretly solves a depressed cubic but keeps it hidden for career reasons; reveals it only on his deathbed.</td>
//                                 </tr>
//                                 <tr>
//                                     <td>07:17</td>
//                                     <td>Tartaglia learns of the challenge and discovers the method himself, using 3D geometry to extend the idea of completing the square.</td>
//                                 </tr>
//                                 <tr>
//                                     <td>10:23</td>
//                                     <td>Tartaglia wins the math duel; writes his solution in poetic form; Cardano convinces him to share the secret under oath.</td>
//                                 </tr>
//                                 <tr>
//                                     <td>12:07</td>
//                                     <td>Cardano generalizes the depressed cubic to all cubic equations by converting to a depressed form using substitution.</td>
//                                 </tr>
//                                 <tr>
//                                     <td>13:12</td>
//                                     <td>Cardano discovers del Ferro's earlier notes and publishes the solution in Ars Magna, crediting Tartaglia but breaking his oath.</td>
//                                 </tr>
//                                 <tr>
//                                     <td>14:20</td>
//                                     <td>The cubic leads to square roots of negative numbers—initially considered meaningless, but hint at something deeper.</td>
//                                 </tr>
//                                 <tr>
//                                     <td>16:39</td>
//                                     <td>Bombelli introduces imaginary numbers to resolve cubic solutions, paving the way for complex numbers.</td>
//                                 </tr>
//                                 <tr>
//                                     <td>17:41</td>
//                                     <td>Algebra becomes independent of geometry; imaginary numbers become essential tools rather than absurdities.</td>
//                                 </tr>
//                                 <tr>
//                                     <td>18:45</td>
//                                     <td>Schrödinger’s equation in quantum mechanics relies fundamentally on imaginary numbers—i becomes central in physics.</td>
//                                 </tr>
//                                 <tr>
//                                     <td>21:34</td>
//                                     <td>Freeman Dyson reflects on the surprising role of imaginary numbers in describing physical reality through quantum mechanics.</td>
//                                 </tr>
//                                 <tr>
//                                     <td>22:45</td>
//                                     <td>Closing remarks, sponsor Brilliant’s offerings in mathematics and science, and encouragement to learn more.</td>
//                                 </tr>
//                             </tbody>
//                         </table>
//                     </div>

//                 </div>
//             </div>
//         </div>
//     );
// }

// export default Body;
