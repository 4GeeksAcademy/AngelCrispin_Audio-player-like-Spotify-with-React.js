import React,{useState,useEffect,useRef} from 'react';

export default function ToDoList () {
  const [allMusics, setAllMusics ] = useState([]);
  const [playing, setPlaying ] = useState(false);
  const [selected, setSelected ] = useState(0);
  const [urlMusic, setUrlMusic ] = useState("");
  const audio = useRef(null);
    
  
  useEffect(() => {
    getMusics();
    reproduceMusic();
  }, [selected,playing]);


  const playMusic = (id) => {

    if(id>allMusics.length){
      id=1;
    } 

    if(id<=0){
      id=allMusics.length;
    } 

    audio.current.pause()
    setSelected(id);
    setUrlMusic(allMusics[id-1].url);
    setPlaying(true);
  }

  const playstopMusic = () => {

    setPlaying(!playing);
  }

  const reproduceMusic = () => {
    playing ? audio.current.play() : audio.current.pause()
  }
  
  const getMusics = () => {

    fetch('https://playground.4geeks.com/sound/songs', {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then(resp => {
          return resp.json();
      })
      .then(data => {
          selected==0?setSelected(data.songs[0].id):setSelected(selected);
          setUrlMusic(data.songs[selected-1].url);
          setAllMusics(data.songs)
      })
      .catch(error => {
          console.log(error);
      });

  };


    return (
        
    <>
      <div className="content mx-auto">
                {allMusics.map((x,index) => (
                      <div key={x.id} className={`justify-content-between d-flex music ${selected==x.id?"selected":""}`} onClick={()=>playMusic(x.id)}>
                        <div className='todo'>{x.id} {x.name}</div>
                      </div>
                ))}
      </div>
    
      <div className="reproductor mx-auto">
        <i className="fa fa-backward my-auto" onClick={()=>playMusic(selected-1)}></i>
        <i className={`fa fa-${playing?"stop":"play"} my-auto`} onClick={()=>playstopMusic()}></i>
        <i className="fa fa-forward my-auto" onClick={()=>playMusic(selected+1)}></i>
      </div>  
      <audio ref={audio} src={`https://playground.4geeks.com${urlMusic}`} type="audio/mp3" />
    </>
  
  );
}