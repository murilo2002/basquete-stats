"use client";
import { useState, ChangeEvent } from "react";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";

type Jogador = {
  id: number;
  nome: string;
  pontos: number;
  rebotes: number;
  assistencias: number;
  jogos: number;
};

type FormState = {
  nome: string;
  pontos: string;
  rebotes: string;
  assistencias: string;
  jogos: string;
};

export default function EstatisticasBasquete() {
  const [jogadores, setJogadores] = useState<Jogador[]>([
    { id: 1, nome: "Murilo Cunha", pontos: 18, rebotes: 7, assistencias: 5, jogos: 3 },
  ]);

  const [form, setForm] = useState<FormState>({ nome: "", pontos: "", rebotes: "", assistencias: "", jogos: "" });
  const [editandoId, setEditandoId] = useState<number | null>(null);
  const [formEdicao, setFormEdicao] = useState<FormState>({ nome: "", pontos: "", rebotes: "", assistencias: "", jogos: "" });

  const calcularMedia = (total: number, jogos: number): string =>
    jogos ? (total / jogos).toFixed(1) : "0.0";

  const adicionarJogador = () => {
    if (!form.nome) return; // validação simples
    const novoJogador: Jogador = {
      id: jogadores.length + 1,
      nome: form.nome,
      pontos: parseInt(form.pontos) || 0,
      rebotes: parseInt(form.rebotes) || 0,
      assistencias: parseInt(form.assistencias) || 0,
      jogos: parseInt(form.jogos) || 0,
    };
    setJogadores([...jogadores, novoJogador]);
    setForm({ nome: "", pontos: "", rebotes: "", assistencias: "", jogos: "" });
  };

  const iniciarEdicao = (jogador: Jogador) => {
    setEditandoId(jogador.id);
    setFormEdicao({
      nome: jogador.nome,
      pontos: jogador.pontos.toString(),
      rebotes: jogador.rebotes.toString(),
      assistencias: jogador.assistencias.toString(),
      jogos: jogador.jogos.toString(),
    });
  };

  const salvarEdicao = () => {
    setJogadores(
      jogadores.map((j) =>
        j.id === editandoId
          ? {
              ...j,
              nome: formEdicao.nome,
              pontos: parseInt(formEdicao.pontos) || 0,
              rebotes: parseInt(formEdicao.rebotes) || 0,
              assistencias: parseInt(formEdicao.assistencias) || 0,
              jogos: parseInt(formEdicao.jogos) || 0,
            }
          : j
      )
    );
    setEditandoId(null);
    setFormEdicao({ nome: "", pontos: "", rebotes: "", assistencias: "", jogos: "" });
  };

  const cancelarEdicao = () => {
    setEditandoId(null);
    setFormEdicao({ nome: "", pontos: "", rebotes: "", assistencias: "", jogos: "" });
  };

  const excluirJogador = (id: number) => {
    setJogadores(jogadores.filter((j) => j.id !== id));
  };

  // Tipagem para eventos onChange dos inputs
  const handleChangeForm = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.placeholder.toLowerCase()]: e.target.value });
  };

  const handleChangeFormEdicao = (e: ChangeEvent<HTMLInputElement>) => {
    setFormEdicao({ ...formEdicao, [e.target.placeholder.toLowerCase()]: e.target.value });
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Cadastrar novo jogador</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-2 mb-2">
          <Input placeholder="Nome" value={form.nome} onChange={handleChangeForm} />
          <Input placeholder="Pontos" value={form.pontos} onChange={handleChangeForm} />
          <Input placeholder="Rebotes" value={form.rebotes} onChange={handleChangeForm} />
          <Input placeholder="Assistências" value={form.assistencias} onChange={handleChangeForm} />
          <Input placeholder="Jogos" value={form.jogos} onChange={handleChangeForm} />
        </div>
        <Button onClick={adicionarJogador}>Adicionar jogador</Button>
      </div>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {jogadores.map((jogador) => (
          <Card key={jogador.id} className="shadow-lg rounded-2xl">
            <CardContent className="p-4">
              {editandoId === jogador.id ? (
                <div className="grid gap-2">
                  <Input value={formEdicao.nome} placeholder="Nome" onChange={handleChangeFormEdicao} />
                  <Input value={formEdicao.pontos} placeholder="Pontos" onChange={handleChangeFormEdicao} />
                  <Input value={formEdicao.rebotes} placeholder="Rebotes" onChange={handleChangeFormEdicao} />
                  <Input value={formEdicao.assistencias} placeholder="Assistências" onChange={handleChangeFormEdicao} />
                  <Input value={formEdicao.jogos} placeholder="Jogos" onChange={handleChangeFormEdicao} />
                  <div className="flex gap-2 mt-2">
                    <Button onClick={salvarEdicao}>Salvar</Button>
                    <Button variant="outline" onClick={cancelarEdicao}>Cancelar</Button>
                    <Button variant="destructive" onClick={() => excluirJogador(jogador.id)}>Excluir</Button>
                  </div>
                </div>
              ) : (
                <>
                  <h2 className="text-xl font-semibold mb-2">{jogador.nome}</h2>
                  <p>Jogos: {jogador.jogos}</p>
                  <p>Pontos totais: {jogador.pontos}</p>
                  <p>Rebotes: {jogador.rebotes}</p>
                  <p>Assistências: {jogador.assistencias}</p>
                  <div className="mt-2 border-t pt-2 text-sm text-gray-600">
                    <p>Média de pontos: {calcularMedia(jogador.pontos, jogador.jogos)}</p>
                    <p>Média de rebotes: {calcularMedia(jogador.rebotes, jogador.jogos)}</p>
                    <p>Média de assistências: {calcularMedia(jogador.assistencias, jogador.jogos)}</p>
                  </div>
                  <Button className="mt-2" onClick={() => iniciarEdicao(jogador)}>Editar</Button>
                </>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
