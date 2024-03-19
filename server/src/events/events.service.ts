import { Injectable } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Events } from './entities/event.entity';
import { FindManyOptions, Repository } from 'typeorm';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Events) private eventsRepository: Repository<Events>,
  ) {}

  
  async create(events: CreateEventDto) {
    return this.eventsRepository.save(this.eventsRepository.create(events));

  }
  
  findAll(limit: string) {
    let options: FindManyOptions<Events>;
    if (limit) options = { take: +limit };
    return this.eventsRepository.find(options);
  }

  async findOne(title: string): Promise <Events> {
    return this.eventsRepository.findOneBy({ title });
  }

}