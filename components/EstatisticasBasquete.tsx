"use client";
import { useState, ChangeEvent } from "react";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";

// Tipos
type Jogador = {
  id: number;
  nome: string;
  pontos: number;
  rebotes: number;
  assistencias: number;
  jogos: number;
};

type Formulario = {
  nome: string;
  pontos: string;
  rebotes: string;
  assistencias: string;
  jogos: string;
};

export default function EstatisticasBasquete() {
  const [jogadores, setJogadores] = useState<Jogador[]>([
    { id: 1, nome: "Lucas Silva", pontos: 18, rebotes: 7, assistencias: 5, jogos: 3 },
    { id: 2, nome: "Marcos Lima", pontos: 26, rebotes: 10, assistencias: 3, jogos: 4 },
    { id: 3, nome: "Carlos Souza", pontos: 10, rebotes: 5, assistencias: 8, jogos: 2 },
  ]);

  const [form, setForm] = useState<Formulario>({
    nome: "", pontos: "", rebotes: "", assistencias: "", jogos: "",
  });

  const [editandoId, setEditandoId] = useState<number | null>(null);

  const [formEdicao, setFormEdicao] = useState<Formulario>({
    nome: "", pontos: "", rebotes: "", assistencias: "", jogos: "",
  });

  const calcularMedia = (total: number, jogos: number): string =>
    jogos ? (total / jogos).toFixed(1) : "0.0";

  const handleChange = (e: ChangeEvent<HTMLInputElement>, tipo: "novo" | "editar") => {
    const { name, value } = e.target;
    if (tipo === "novo") {
      setForm({ ...form, [name]: value });
    } else {
      setFormEdicao({ ...formEdicao, [name]: value });
    }
  };

  const adicionarJogador = () => {
    const novoJogador: Jogador = {
      id: jogadores.length + 1,
      nome: form.nome,
      pontos: parseInt(form.pontos),
      rebotes: parseInt(form.rebotes),
      assistencias: parseInt(form.assistencias),
      jogos: parseInt(form.jogos),
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
              pontos: parseInt(formEdicao.pontos),
              rebotes: parseInt(formEdicao.rebotes),
              assistencias: parseInt(formEdicao.assistencias),
              jogos: parseInt(formEdicao.jogos),
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

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Cadastrar novo jogador</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-2 mb-2">
          <Input name="nome" placeholder="Nome" value={form.nome} onChange={(e) => handleChange(e, "novo")} />
          <Input name="pontos" placeholder="Pontos" value={form.pontos} onChange={(e) => handleChange(e, "novo")} />
          <Input name="rebotes" placeholder="Rebotes" value={form.rebotes} onChange={(e) => handleChange(e, "novo")} />
          <Input name="assistencias" placeholder="Assistências" value={form.assistencias} onChange={(e) => handleChange(e, "novo")} />
          <Input name="jogos" placeholder="Jogos" value={form.jogos} onChange={(e) => handleChange(e, "novo")} />
        </div>
        <Button onClick={adicionarJogador}>Adicionar jogador</Button>
      </div>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {jogadores.map((jogador) => (
          <Card key={jogador.id} className="shadow-lg rounded-2xl">
            <CardContent className="p-4">
              {editandoId === jogador.id ? (
                <div className="grid gap-2">
                  <Input name="nome" value={formEdicao.nome} onChange={(e) => handleChange(e, "editar")} />
                  <Input name="pontos" value={formEdicao.pontos} onChange={(e) => handleChange(e, "editar")} />
                  <Input name="rebotes" value={formEdicao.rebotes} onChange={(e) => handleChange(e, "editar")} />
                  <Input name="assistencias" value={formEdicao.assistencias} onChange={(e) => handleChange(e, "editar")} />
                  <Input name="jogos" value={formEdicao.jogos} onChange={(e) => handleChange(e, "editar")} />
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
