import React from 'react'
import { Button } from 'react-bootstrap'

const updateFixtures = () => {
    console.log('fixtures updated')
}

const updateEvents = () => {
    console.log('events updated')
}

const updatePlayerList1 = () => {
    console.log('player list 1 updated')
}

const updatePlayerList2 = () => {
    console.log('player list 2 updated')
}
const updatePlayerList3 = () => {
    console.log('player list 3 updated')
}
const updatePlayerList4 = () => {
    console.log('player list 4 updated')
}
const updatePlayerList5 = () => {
    console.log('player list 5 updated')
}
const updatePlayerList6 = () => {
    console.log('player list 6 updated')
}
const updatePlayerList7 = () => {
    console.log('player list 7 updated')
}

const Admin = () => {
    return (
        <div className='admin-panel'>
            <div className='admin-panel-child'>
                <div>
                    <h5>Update Fixtures</h5>
                    <div className='admin-panel-line'></div>
                    <div>Message</div>
                    <div className='admin-update'>
                        <div>Updated on:&nbsp;</div>
                        <div>Yesterday</div>
                    </div>
                    <Button onClick={updateFixtures}>Update</Button>
                </div>
            </div>
            <div className='admin-panel-child'>
                <div>
                    <h5>Update Events</h5>
                    <div className='admin-panel-line'></div>
                    <div>Message</div>
                    <div className='admin-update'>
                        <div>Updated on:&nbsp;</div>
                        <div>Yesterday</div>
                    </div>
                    <Button onClick={updateEvents}>Update</Button>
                </div>
            </div>
            <div className='admin-panel-child'>
                <div>
                    <h5>Update Player List 1</h5>
                    <div className='admin-panel-line'></div>
                    <div>Message</div>
                    <div className='admin-update'>
                        <div>Updated on:&nbsp;</div>
                        <div>Yesterday</div>
                    </div>
                    <Button onClick={updatePlayerList1}>Update</Button>
                </div>
            </div>
            <div className='admin-panel-child'>
                <div>
                    <h5>Update Player List 2</h5>
                    <div className='admin-panel-line'></div>
                    <div>Message</div>
                    <div className='admin-update'>
                        <div>Updated on:&nbsp;</div>
                        <div>Yesterday</div>
                    </div>
                    <Button onClick={updatePlayerList2}>Update</Button>
                </div>
            </div>
            <div className='admin-panel-child'>
                <div>
                    <h5>Update Player List 3</h5>
                    <div className='admin-panel-line'></div>
                    <div>Message</div>
                    <div className='admin-update'>
                        <div>Updated on:&nbsp;</div>
                        <div>Yesterday</div>
                    </div>
                    <Button onClick={updatePlayerList3}>Update</Button>
                </div>
            </div>
            <div className='admin-panel-child'>
                <div>
                    <h5>Update Player List 4</h5>
                    <div className='admin-panel-line'></div>
                    <div>Message</div>
                    <div className='admin-update'>
                        <div>Updated on:&nbsp;</div>
                        <div>Yesterday</div>
                    </div>
                    <Button onClick={updatePlayerList4}>Update</Button>
                </div>
            </div>
            <div className='admin-panel-child'>
                <div>
                    <h5>Update Player List 5</h5>
                    <div className='admin-panel-line'></div>
                    <div>Message</div>
                    <div className='admin-update'>
                        <div>Updated on:&nbsp;</div>
                        <div>Yesterday</div>
                    </div>
                    <Button onClick={updatePlayerList5}>Update</Button>
                </div>
            </div>
            <div className='admin-panel-child'>
                <div>
                    <h5>Update Player List 6</h5>
                    <div className='admin-panel-line'></div>
                    <div>Message</div>
                    <div className='admin-update'>
                        <div>Updated on:&nbsp;</div>
                        <div>Yesterday</div>
                    </div>
                    <Button onClick={updatePlayerList6}>Update</Button>
                </div>
            </div>
            <div className='admin-panel-child'>
                <div>
                    <h5>Update Player List 7</h5>
                    <div className='admin-panel-line'></div>
                    <div>Message</div>
                    <div className='admin-update'>
                        <div>Updated on:&nbsp;</div>
                        <div>Yesterday</div>
                    </div>
                    <Button onClick={updatePlayerList7}>Update</Button>
                </div>
            </div>
        </div>
    )
}

export default Admin