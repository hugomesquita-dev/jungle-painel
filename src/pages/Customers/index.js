import Header from '../../components/Header';
import Title from '../../components/Title';
import { FiAnchor, FiEdit } from 'react-icons/fi';
import api from '../../services/api';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './customers.css';
// import Homecam from '../../components/WebcamCapture';


export default function Customers(){
    
    const [data, setData] = useState([]);
    const [TabActive, setTabActive] = useState('in_progress');
    //const [itens, setItens] = useState([]);
    // const [loading, setLoading] = useState(true);
    // const [loadingMore, setLoadingMore] = useState(false)
    // const [imageUrl, setImage] = useState();
    



    //let rowArr = [];
    useEffect(() =>{
        async function handleList(){
            await api.get('/customers/list/')
            .then((response) => {
                //console.log(response.data)

                // setData(data => [...data, ...response.data])

                // console.log(itens)
                // rowArr.push({
                //     id: response.data.id,
                //     title: response.data.title,
                //     type_service: response.data.type_service
                // });
                
                // setData(data => [...data, ...rowArr]);

        
                

                // setData(data => [...data, 
                //                 ...response.data]);


                let tabsDados = {
                    "in_progress": {
                        dados: response.data.filter(i => i.status === '0')
                    },
                    "completed": {
                        dados: response.data.filter(i => i.status === '1')
                    }
                }


                console.log(TabActive)
                console.log(tabsDados[TabActive].dados)
                setData(tabsDados[TabActive].dados)
              
                //objeto
                //console.log(dadosArr);
                //array
                //console.log(dadosArr.in_pro
                // if(data !== undefined){
                //     setData({...data, ...tabsDados});
                //     return;
                // }else{
                //     return
                // }
 


                // console.log(data);
                // setData(data => [
                //     ...data, ...response.data
                //     //response.data.filter(i => i.status === 1)  
                // ]);

                // console.log(data);
                //console.log(...response.data.filter(i => i.status === 1));
            })
            .catch((error)=>{
                console.log("Deu algum erro: ", error);
                // setLoadingMore(false);
            })

            // setLoading(false);
        }
        
        handleList();

        return () => {
            
        }

    },[TabActive])

    const changeTabSelected = (TabActive) => {
        setTabActive(TabActive);
        console.log(TabActive);
    }

    //console.log(data);

    // let itens_selected = [];
    // const handleTab = (value) => {
    
    //     if(value === 0){
    //         //itens_selected = data[1].in_progress.dados;

    //         setItens(data[1].in_progress.dados);
    //     }

    //     // if(value === 1){
    //     //     //itens_selected = data[1].completed.dados;
    //     //     setItens(data[1].completed.dados);
    //     // }

    //     //setItens(itens_selected);
    //     console.log(itens);
    //     console.log(value)
    //     // <TabItem title={result}/>

    //     //console.log(result);
    //     //console.log(data[1].completed.dados);   
    // }


    // const tabs = {
    //     "in_progress": {
    //         title: "Pendentes de Autorização",
    //         tabActive: 0
    //     },
    //     "completed":{
    //         title: "Autorizados",
    //         tabActive: 1
    //     }
    // }

    // console.log(data)


    return(
        <div>
            <Header />
            <div className="content">
                <Title name="Embarcação">
                    <FiAnchor size={25} color="#000"/>
                </Title>
                <div className="page">
                    <Link to="/addcustomers" className="btn btn-success">Adicionar</Link>

                    <ul className="page-tab">
                        <li><Link to="#" onClick={() => changeTabSelected('in_progress')} className="active">Pendentes de Autorização</Link></li>
                        <li><Link to="#" onClick={() => changeTabSelected('completed')}>Autorizados</Link></li>
                    </ul> 

                    <ul className="page-list">
                       

                        {data.map((item, index)=>{
                            return(
                                <li key={index}>
                                    <div className="page-list-title">{item.title}<br /><span>{item.type_service}</span></div> 
                                    <div className="page-list-acao">
                                        {/* <Link to="" className="tag">AUTORIZAR</Link> */}
                                        <Link to={{
                                            pathname: `/customers/${item.id}`,
                                            // detalhes: {
                                            //     title: item.title,
                                            //     type_service: item.type_service,
                                            //     status: item.status,
                                            //     obs: item.obs,
                                            //     image_viewfinder: item.image_viewfinder 
                                            // }
                                        }}
                                           
                                        ><FiEdit color="#111" size={20}/> Editar</Link>                                    
                                    </div>    
                                </li>
                            )
                        })}
                    </ul>

                    {/* <img src={imageUrl} alt="Visor"/> */}
                    {/* <Homecam /> */}
                </div>
            </div>
        </div>
    );
}