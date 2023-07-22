import { Request, Response } from 'express'

class Responses {
    success = (response: Response, message: String, payload: Object) => {
        return response.status(200).json({ message, payload});
    }

    unknownError = (response: Response, error: Error) => {
        return response.status(500).json({'error':error.message});
    }

    notFound = (response: Response, message: String) => {
        return response.status(404).json({'error':message});
    }

    preconditionFailed = (response: Response, message: String) => {
        return response.status(401).json({'error': message});
      }
}

export default Responses
  