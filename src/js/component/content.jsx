import React,{useState,useEffect} from 'react';

export default function ToDoList () {
  const [allMusics, setAllMusics ] = useState([]);
  const [playing, setPlaying ] = useState(false);
  const [selected, setSelected ] = useState(0);
    
    
  useEffect(() => {
    getMusics();
  }, [selected]);


  const playMusic = (id) => {

    setSelected(id);
    setPlaying(true);
    //var musicSelected = document.getElementById("music"+id);
    //musicSelected.classList.add("selected");
  }

  const playNextMusic = () => {
    setSelected(selected+1>allMusics.length?selected+1-allMusics.length:selected+1);
    setPlaying(true);
  }

  const playPreviousMusic = () => {
    setSelected(selected-1<=0?allMusics.length:selected-1);
    setPlaying(true);
  }
  const playstopMusic = () => {

    setPlaying(!playing);
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
          setAllMusics(data.songs)
      })
      .catch(error => {
          console.log(error);
      });

  };


    return (
        
    <>
      <div className="content mx-auto">
                {allMusics.map((x) => (
                      <div key={x.id} className={`justify-content-between d-flex music ${selected==x.id?"selected":""}`} id={`music${x.id}`} onClick={()=>playMusic(x.id)}>
                        <div className='todo'>{x.id} {x.name}</div>
                      </div>
                ))}
      </div>
    
      <div className="reproductor mx-auto">
        <i className="fa fa-backward my-auto" onClick={()=>playPreviousMusic()}></i>
        <i className={`fa fa-${playing?"stop":"play"} my-auto`} onClick={()=>playstopMusic()}></i>
        <i className="fa fa-forward my-auto" onClick={()=>playNextMusic()}></i>
      </div>  
    </>
  
  );
}