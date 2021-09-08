import { Injectable, NotFoundException, UnauthorizedException, UnsupportedMediaTypeException } from '@nestjs/common'
import { FileUpload } from 'graphql-upload'
import { createWriteStream, readFile, mkdir, unlinkSync } from 'fs'
import { promisify } from 'util'
import * as sharp from 'sharp'

import { DataService } from '@feature/core'
import { CreateMultimediaInput } from '../dto/create-multimedia.input'

const readFileAsyc = promisify(readFile)
@Injectable()
export class MultimediaService {
  private readonly sizes: string[]
  constructor(private readonly _service: DataService) {
    this.sizes = ['150X150', '600X600', '740X560', '1024X1024', '1900X600']
    this.sizes.forEach((size) => {
      mkdir(`uploads/${size}`, { recursive: true }, (err) => {
        if (err) throw err
      })
    })
  }

  async getAllMultimedias() {
    return this._service.multimedia.findMany({ orderBy: { id: 'asc' } })
  }

  async createMultimedia(profileId: number, input: CreateMultimediaInput) {
    return this._service.multimedia.create({
      data: {
        createdBy: profileId,
        ...input,
      },
    })
  }

  async saveMultimedia(user, file: FileUpload, formats: Array<string> = ['jpeg', 'jpg', 'png']) {
    const { mimetype } = file
    const [, ext] = mimetype.split('/')
    const filename = `${Math.random().toString(36).substring(2, 12)}.${ext}`
    if (formats.includes(ext)) {
      return new Promise(async (resolve, reject) =>
        file
          .createReadStream()
          .pipe(createWriteStream(`uploads/${filename}`))
          .on('finish', () => {
            const input: CreateMultimediaInput = {
              path: `uploads/${filename}`,
              filename: filename,
              extension: ext,
              status: true,
            }
            const savedFile = this.createMultimedia(user.profile.id, input)
            this.createFilesInServer(filename, ext)
            return resolve(savedFile)
          })
          .on('error', () => reject(new UnsupportedMediaTypeException('Cant upload file'))),
      )
    } else {
      throw new UnsupportedMediaTypeException('Cant upload file')
    }
  }

  async getMultimediaById(id: number) {
    const found = await this._service.multimedia.findUnique({ where: { id } })
    if (!found) {
      throw new NotFoundException(`Multimedia with id: ${id} not found`)
    }
    return found
  }

  async getMultimediaByFilename(filename: string) {
    const found = await this._service.multimedia.findUnique({ where: { filename: filename } })
    if (!found) {
      throw new NotFoundException(`Multimedia with id: ${filename} not found`)
    }
    return found
  }

  async deleteMultimediaByUser(filename: string, profileId: number) {
    const found = await this.getMultimediaByFilename(filename)
    if (found.createdBy !== profileId) {
      throw new UnauthorizedException()
    }
    const deleted = await this._service.multimedia.delete({
      where: {
        id: found.id,
      },
    })
    await this.deleteFilesInServer(found.filename, found.path, found.extension)
    return !!deleted
  }

  async deleteMultimediaByAdmin(id: number) {
    const found = await this.getMultimediaById(id)
    const deleted = await this._service.multimedia.delete({
      where: {
        id: found.id,
      },
    })
    await this.deleteFilesInServer(found.filename, found.path, found.extension)
    return !!deleted
  }

  async createFilesInServer(filename: string, extension: string) {
    if (['jpeg', 'jpg', 'png'].includes(extension)) {
      this.sizes.forEach((s: string) => {
        const [size] = s.split('X')
        readFileAsyc(`uploads/${filename}`)
          .then((b: Buffer) => {
            return sharp(b)
              .resize(+size)
              .toFile(`uploads/${s}/${filename}`)
          })
          .catch(console.error)
      })
    }
  }

  deleteFilesInServer(filename: string, path: string, extension: string) {
    if (['jpeg', 'jpg', 'png'].includes(extension)) {
      this.sizes.forEach((s: string) => {
        unlinkSync(`uploads/${s}/${filename}`)
      })
    }
    unlinkSync(path)
  }
}
