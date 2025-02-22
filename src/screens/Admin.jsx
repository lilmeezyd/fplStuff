import React from 'react'
import { Button, Spinner } from 'react-bootstrap'
import { useUpdateFixturesMutation } from '../slices/fixtureApiSlice'
import { useUpdateEventsMutation } from '../slices/eventApiSlice'
import {
    useUpdatePlayersMutation,
    useUpdatePlayers2Mutation, useUpdatePlayers3Mutation,
    useUpdatePlayers4Mutation, useUpdatePlayers5Mutation, useUpdatePlayers6Mutation, useUpdatePlayers7Mutation,
    useUpdatePlayers8Mutation
} from '../slices/loadPlayersSlice'



const Admin = () => {

    const [updateFixtures, { isLoading: fixLoad }] = useUpdateFixturesMutation()
    const [updateEvents, { isLoading: eventLoad }] = useUpdateEventsMutation()
    const [updatePlayers, { isLoading: playLoad }
    ] = useUpdatePlayersMutation()
    const [updatePlayers2, { isLoading: playLoad2 }
    ] = useUpdatePlayers2Mutation()
    const [updatePlayers3, { isLoading: playLoad3 }
    ] = useUpdatePlayers3Mutation()
    const [updatePlayers4, { isLoading: playLoad4 }
    ] = useUpdatePlayers4Mutation()
    const [updatePlayers5, { isLoading: playLoad5 }
    ] = useUpdatePlayers5Mutation()
    const [updatePlayers6, { isLoading: playLoad6 }
    ] = useUpdatePlayers6Mutation()
    const [updatePlayers7, { isLoading: playLoad7 }
    ] = useUpdatePlayers7Mutation()
    const [updatePlayers8, { isLoading: playLoad8 }
    ] = useUpdatePlayers8Mutation()

    const updateFixtureList = async () => {
        try {
            const res = await updateFixtures().unwrap()
            console.log(res)
            console.log('fixtures updated')
        } catch (error) {
            console.log(error)
        }
    }

    const updateEventList = async () => {
        try {
            const res = await updateEvents().unwrap()
            console.log(res)
        } catch (error) {
            console.log(error)
        }
    }

    const updatePlayerList1 = async () => {
        try {
            const res = await updatePlayers().unwrap()
            console.log(res)
        } catch (error) {
            console.log(error)
        }
    }

    const updatePlayerList2 = async () => {
        try {
            const res = await updatePlayers2().unwrap()
            console.log(res)
        } catch (error) {
            console.log(error)
        }
    }
    const updatePlayerList3 = async () => {
        try {
            const res = await updatePlayers3().unwrap()
            console.log(res)
        } catch (error) {
            console.log(error)
        }
    }
    const updatePlayerList4 = async () => {
        try {
            const res = await updatePlayers4().unwrap()
            console.log(res)
        } catch (error) {
            console.log(error)
        }
    }
    const updatePlayerList5 = async () => {
        try {
            const res = await updatePlayers5().unwrap()
            console.log(res)
        } catch (error) {
            console.log(error)
        }
    }
    const updatePlayerList6 = async () => {
        try {
            const res = await updatePlayers6().unwrap()
            console.log(res)
        } catch (error) {
            console.log(error)
        }
    }
    const updatePlayerList7 = async () => {
        try {
            const res = await updatePlayers7().unwrap()
            console.log(res)
        } catch (error) {
            console.log(error)
        }
    }
    const updatePlayerList8 = async () => {
        try {
            const res = await updatePlayers8().unwrap()
            console.log(res)
        } catch (error) {
            console.log(error)
        }
    }
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
                    <Button onClick={updateFixtureList}>
                        {fixLoad === true ? <Spinner /> : 'Update'}
                    </Button>
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
                    <Button onClick={updateEventList}>
                        {eventLoad === true ? <Spinner /> : 'Update'}
                    </Button>
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
                    <Button onClick={updatePlayerList1}>
                    {playLoad === true ? <Spinner /> : 'Update'}
                    </Button>
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
                    <Button onClick={updatePlayerList2}>
                    {playLoad2 === true ? <Spinner /> : 'Update'}
                    </Button>
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
                    <Button onClick={updatePlayerList3}>
                    {playLoad3 === true ? <Spinner /> : 'Update'}
                    </Button>
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
                    <Button onClick={updatePlayerList4}>
                    {playLoad4 === true ? <Spinner /> : 'Update'}
                    </Button>
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
                    <Button onClick={updatePlayerList5}>
                    {playLoad5 === true ? <Spinner /> : 'Update'}
                    </Button>
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
                    <Button onClick={updatePlayerList6}>
                    {playLoad6 === true ? <Spinner /> : 'Update'}
                    </Button>
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
                    <Button onClick={updatePlayerList7}>
                    {playLoad7 === true ? <Spinner /> : 'Update'}
                    </Button>
                </div>
            </div>
            <div className='admin-panel-child'>
                <div>
                    <h5>Update Player List 8</h5>
                    <div className='admin-panel-line'></div>
                    <div>Message</div>
                    <div className='admin-update'>
                        <div>Updated on:&nbsp;</div>
                        <div>Yesterday</div>
                    </div>
                    <Button onClick={updatePlayerList8}>
                    {playLoad8 === true ? <Spinner /> : 'Update'}
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default Admin