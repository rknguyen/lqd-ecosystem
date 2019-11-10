import { RKError } from '../utils/response'

export default (req: any, res: any, next: any) => {
  if (!req.user!) {
    return res.json((new RKError('Cần phải đăng nhập trước')).toJSON())
  }
  next()
}