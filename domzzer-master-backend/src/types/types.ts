import { ObjectId } from "mongoose";
import { Request } from 'express';

// custom Request that includes token
export interface CustomRequest extends Request {
  token?: string,
}

// configuration type that holds all environmental variables
export interface Configuration {
  SALT_ROUNDS: number,
  SECRET: string,
  AES256_KEY: string,
  MONGODB_URI: string,
  PORT: number
}

// type for system information
export interface SystemInformation {
  time: string,
  uptime: string,
  hostname: string,
  serverType: string,
  serverVersion: string,
  serverMemoryMb: number
}

// type for login information
export interface Credentials {
  username?: string,
  password?: string
}

// type for Slave machine
export interface Slave {
  name: string,
  address: string,
  status: 'ONLINE' | 'OFFLINE',
  testsDone: number,
  vulnerabilitiesFound: number,
  username: string,
  password: string,
  _id: ObjectId
}

// type for Slave machine after transformation toJSON document
export interface TransformedSlave {
  name: string,
  address: string,
  status: 'ONLINE' | 'OFFLINE',
  testsDone: number,
  vulnerabilitiesFound: number,
  username: string,
  password: string,
  id: string
}

// type for new Slave to be created
export interface NewSlave {
  name?: string,
  address?: string,
  username?: string,
  password?: string
}

// type for updating Slave
export interface UpdateSlave {
  name?: string,
  address?: string,
  username?: string,
  password?: string
}

// type for User
export interface User {
  username: string,
  userRole: 'LITE' | 'PRO' | 'ADMIN',
  passwordHash: string,
  _id: ObjectId
}

// type for new User
export interface NewUser {
  username?: string,
  userRole?: 'LITE' | 'PRO' | 'ADMIN',
  password?: string
}

// type for updating User
export interface UpdateUser {
  username?: string,
  userRole?: 'LITE' | 'PRO' | 'ADMIN',
  password?: string
}

// type for Vulnerability
export interface Vulnerability {
  serverAddress: string,
  targetBrowser: string,
  timestamp: Date,
  status: 'OPEN' | 'ZERODAY' | 'CLOSED',
  payload: string,
  _id: ObjectId
}

// type for Vulnerabilitiy after transformation toJSON document
export interface TransformedVulnerability {
  serverAddress: string,
  targetBrowser: string,
  timestamp: Date,
  status: 'OPEN' | 'ZERODAY' | 'CLOSED',
  payload: string,
  id: string
}

// type for new Vulnerability to be created
export interface NewVulnerability {
  serverAddress?: string,
  targetBrowser?: string,
  timestamp?: Date,
  payload?: string,
  status?: 'OPEN' | 'ZERODAY' | 'CLOSED',
}


// type for updating Vulnerability
export interface UpdateVulnerability {
  status?: 'OPEN' | 'ZERODAY' | 'CLOSED'
}