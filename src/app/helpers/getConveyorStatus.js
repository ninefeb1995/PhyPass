let getConveyorStatus = (statusId) => {
    switch (statusId) {
        case 0:
            return 'Free';
        case 1:
            return 'Waiting';
        case 2:
            return 'Inprogress';
        case 4:
            return 'Error';
        case 8:
            return 'Pause';
        case 16:
            return 'Complete';
    }
}

export default getConveyorStatus;
