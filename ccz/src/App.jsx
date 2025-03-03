import React, {useState} from 'react';
import {StreamChat} from 'stream-chat';
import {Chat} from 'stream-chat-react';
import Cookies from 'universal-cookie';

import 'stream-chat-react/dist/css/v2/index.css';
import './App.css';

import ChannelContainer from './components/ChannelContainer';
import ChannelListContainer from './components/ChannelListContainer';
import Auth from './components/Auth';

const cookies = new Cookies();

const apiKey = 'p23e5xsfvmck';
const authToken = cookies.get("token");
const client = StreamChat.getInstance(apiKey);

if(authToken){
    client.connectUser({
        name:cookies.get('username'),
        fullName:cookies.get('fullName'),
        id:cookies.get('userId'),
        phoneNumber:cookies.get('phoneNumber'),
        image:cookies.get('avatarURL'),
        hashedPassword:cookies.get('hashedPassword'),
    }, authToken )
}

const App = () =>{
    const [createType, setCreateType] = useState('');
    const [isCreating, setIsCreating] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    if(!authToken) return <Auth/>

    return(
        <div className="app__wrapper">
            <Chat client={client} theme="team light">
                <ChannelListContainer
                    isCreating = {isCreating}
                    setIsCreating={setIsCreating}
                    setCreateType={setCreateType}
                    setIsEditing={setIsEditing}
                />

                <ChannelContainer
                    isCreating = {isCreating}
                    setIsCreating={setIsCreating}
                    isEditing={isEditing}
                    setIsEditing={setIsEditing}
                    createType={createType}
                />
            </Chat>
        </div>
    );
}

export default App;
