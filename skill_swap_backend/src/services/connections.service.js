import ApiError from "../errors/ApiError.js";
import ConnectionRequest from "../models/connection.model.js";


export const sendConnectionRequestService = async (requestBody) => {
    if (!requestBody.from || !requestBody.to) {
        throw new ApiError("Body must contain to and from fields");
    }

    const existingRequest = await ConnectionRequest.findOne({ to: requestBody.to, from: requestBody.from, status: "pending" })

    if (existingRequest) {
        throw new ApiError("Connection request already exists")
    }

    await ConnectionRequest.deleteOne({
        to: requestBody.to,
        from: requestBody.from,
        status: "rejected"
    })

    const request = await ConnectionRequest.create(requestBody)

    return request

}

export const acceptConnectionRequestService = async (requestBody) => {

    const updateRequestStatus = await ConnectionRequest.findOneAndUpdate(
        {
            from: requestBody.from,
            to: requestBody.to,
            status: "pending"
        },
        {
            status: "accepted"
        },
        {
            new: true
        }
    );

    if (!updateRequestStatus) {
        throw new ApiError("Request could not be accepted or does not exist");
    }

    return updateRequestStatus;
}

export const rejectConnectionRequestService = async (requestBody) => {

    const updateRequestStatus = await ConnectionRequest.findOneAndUpdate(
        {
            from: requestBody.from,
            to: requestBody.to,
            status: "pending"
        },
        {
            status: "rejected"
        },
        {
            new: true
        }
    );

    if (!updateRequestStatus) {
        throw new ApiError("Request could not be accepted or does not exist");
    }

    return updateRequestStatus;
}

export const cancelConnectionRequestService = async (requestBody) => {

    const cancelRequest = await ConnectionRequest.findOneAndDelete(
        {
            from: requestBody.from,
            to: requestBody.to,
            status: "pending"
        }
    )

    if (!cancelRequest) {
        throw new ApiError("Request could not be cancelled or does not exist");
    }

    return cancelRequest
}

export const showPendingRequestService = async (userId) => {
    const pendingRequests = await ConnectionRequest.find({ from: userId, status: "pending" });

    return pendingRequests
}

export const showReceivedRequestService = async (userId) => {
    const receivedRequests = await ConnectionRequest.find({ to: userId, status: "pending" });
    return receivedRequests
}

export const showAcceptedRequestService = async (userId) => {
    const acceptedRequests = await ConnectionRequest.find({ to: userId, status: "accepted" });

    return acceptedRequests
}




