import React from 'react'

const PokemonCard = ({pokemon}) => {
  const{id,name,sprites,types,abilities,stats} = pokemon
  
  
    return (
    <div className='pokemon-card'>
        <h3 className='pokemon-name'>
            {name.charAt(0).toUpperCase()+name.slice(1)}(#{id})
        </h3>
        <img src={sprites?.front_default} alt={name} className='pokemon-image' />
      
        <div className="pokemon-info">
            <p><strong>Types:</strong>{types.map((t)=>t.type.name).join(', ')}</p>
            <p><strong>Abilities:</strong>{abilities.map((a)=>a.ability.name).join(', ')}</p>
        
        <div>
        <strong>Stats:</strong>
        <ul>
            {stats.map((statObj)=>(
                <li key={statObj.stat.name}>
                    {statObj.stat.name}:{statObj.base_stat}
                </li>
            ))}
        </ul>
        </div>
        </div>


    </div>



  )
}

export default PokemonCard
